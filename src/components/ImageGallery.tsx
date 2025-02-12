import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Airtable from 'airtable';
import { Link } from 'react-router-dom';

interface Photo {
  id: string;
  url: string;
  category: string;
  style: string;
}

interface ImageGalleryProps {
  category: string;
  style: string;
  onClose: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ category, style, onClose }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const mainImageRef = useRef<HTMLImageElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<number>();
  const preloadedImages = useRef<Set<string>>(new Set());

  const virtualizer = useVirtualizer({
    count: photos.length,
    getScrollElement: () => thumbnailsRef.current,
    estimateSize: () => 97, // 77px + 20px for spacing and borders
    overscan: 5,
    horizontal: true,
  });

  // Show gallery with animation after initial render
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY })
        .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

      const records = await base('database')
        .select({
          filterByFormula: `AND({Room} = '${category}', {Style} = '${style}')`
        })
        .all();

      const fetchedPhotos = records.map(record => ({
        id: record.id,
        url: record.fields['Cloudinary URL'] as string,
        category: record.fields['Room'] as string,
        style: record.fields['Style'] as string,
      }));

      if (fetchedPhotos.length === 0) {
        throw new Error('No images found for this category and style.');
      }

      setPhotos(fetchedPhotos);
      // Preload the first image after setting the photos
      if (fetchedPhotos.length > 0) {
        await preloadImage(fetchedPhotos[0].url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
      console.error('Error fetching photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const preloadImage = (url: string): Promise<void> => {
    if (preloadedImages.current.has(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        preloadedImages.current.add(url);
        resolve();
      };
      img.onerror = reject;
    });
  };

  const preloadAdjacentImages = useCallback(() => {
    if (photos.length === 0) return;

    const nextIndex = (currentIndex + 1) % photos.length;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;

    Promise.all([
      preloadImage(photos[nextIndex].url),
      preloadImage(photos[prevIndex].url)
    ]).catch(console.error);
  }, [currentIndex, photos]);

  useEffect(() => {
    fetchPhotos();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [category, style]);

  useEffect(() => {
    if (autoplayEnabled && photos.length > 0) {
      autoplayTimerRef.current = window.setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % photos.length);
      }, 5000);

      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }
  }, [autoplayEnabled, photos.length]);

  useEffect(() => {
    if (photos.length > 0) {
      preloadAdjacentImages();
    }
  }, [currentIndex, preloadAdjacentImages, photos.length]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handlePrevious = () => {
    if (photos.length > 0) {
      setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
      setAutoplayEnabled(false);
    }
  };

  const handleNext = () => {
    if (photos.length > 0) {
      setCurrentIndex(prev => (prev + 1) % photos.length);
      setAutoplayEnabled(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // *** FOOTER SCROLL LOGIC ***
  const triggerFooterContact = (): void => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      // Calculate the total scroll height and scroll to the bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth'
      });
      
      // After a short delay, trigger the footer's contact button
      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement | null;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <div className="text-white text-center p-8">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div 
      className={`fixed inset-0 bg-black/90 z-50 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
          }}
          className="p-2 text-white/80 hover:text-white transition-colors duration-200"
          aria-label="Close gallery"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        className={`h-full flex flex-col justify-center items-center pt-12 pb-8 px-8 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-4'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
        ) : photos.length > 0 && currentPhoto ? (
          <>
            <div className="relative w-full max-w-[880px] h-[495px] bg-black/30 rounded-lg group">
              <img
                ref={mainImageRef}
                src={currentPhoto.url}
                alt={`${category} ${style}`}
                className={`w-full h-full object-contain transition-all duration-300 ${
                  isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onLoad={handleImageLoad}
              />

              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div
              ref={thumbnailsRef}
              className="mt-8 max-w-[920px] w-full overflow-x-auto scrollbar-hide"
              style={{ 
                padding: '20px 20px', // Increased padding for better visibility
                position: 'relative',
                zIndex: 10 
              }}
            >
              <div
                style={{
                  width: `${virtualizer.getTotalSize()}px`,
                  height: '97px',
                  position: 'relative',
                  margin: '0 auto',
                }}
              >
                {virtualizer.getVirtualItems().map(virtualItem => {
                  const photo = photos[virtualItem.index];
                  if (!photo) return null;
                  
                  return (
                    <div
                      key={photo.id}
                      style={{
                        position: 'absolute',
                        top: '10px', // Increased top spacing
                        left: 0,
                        width: '77px',
                        height: '77px',
                        transform: `translateX(${virtualItem.start}px)`,
                      }}
                      className={`
                        relative
                        cursor-pointer 
                        transition-all 
                        duration-200 
                        rounded-lg 
                        overflow-hidden
                        ${
                          currentIndex === virtualItem.index
                            ? 'ring-2 ring-white ring-offset-4 ring-offset-black shadow-xl scale-105'
                            : 'border-2 border-[#E0E0E0] opacity-50 hover:opacity-80'
                        }
                        hover:shadow-lg
                        hover:scale-105
                        hover:border-white/50
                      `}
                      onClick={() => {
                        setCurrentIndex(virtualItem.index);
                        setAutoplayEnabled(false);
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={`Thumbnail ${virtualItem.index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons at the bottom */}
            <div className="mt-12 flex justify-center space-x-4">
              <Link to="/projects">
                <button className="px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200">
                  View all
                </button>
              </Link>

              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    onClose();
                    triggerFooterContact();
                  }, 300); // Wait for fade out animation
                }}
                className="px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200"
              >
                Ask for help
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ImageGallery;