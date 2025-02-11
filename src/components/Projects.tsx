import React, { useState, useEffect, useRef } from 'react';
import { Sofa, ChefHat, Utensils, Bed, Bath, Lightbulb, ChevronLeft, ChevronRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Airtable from 'airtable';
import { useScrollManager } from '../hooks/useScrollManager';
import ImageGallery from './ImageGallery';

gsap.registerPlugin(ScrollTrigger);

interface ProjectOption {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  hasContent: boolean;
}

interface Style {
  id: number;
  name: string;
  icon: JSX.Element;
}

const styles: Style[] = [
  {
    id: 1,
    name: 'Modern',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="12" y1="3" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Traditional',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 000 20M2 12h20" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Ardeco',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

const projectOptions: ProjectOption[] = [
  {
    id: 1,
    title: 'Living Room',
    subtitle: 'Elegant Comfort',
    description: 'Experience the perfect blend of luxury and comfort in our meticulously designed living spaces.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Living%20Room/livingroom_traditional_5.avif',
    icon: <Sofa className="w-6 h-6" />,
    hasContent: true
  },
  {
    id: 2,
    title: 'Kitchen',
    subtitle: 'Culinary Excellence',
    description: 'Modern kitchens designed for both functionality and aesthetics.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Kitchen/kitchen_modern_5.jpg',
    icon: <ChefHat className="w-6 h-6" />,
    hasContent: true
  },
  {
    id: 3,
    title: 'Dining Area',
    subtitle: 'Sophisticated Dining',
    description: 'Create memorable moments in our elegantly designed dining spaces.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/3e48fefc776aeb5c41fc951ab88a7d85_xgf8bc.jpg',
    icon: <Utensils className="w-6 h-6" />,
    hasContent: true
  },
  {
    id: 4,
    title: 'Bedroom',
    subtitle: 'Luxury Designs',
    description: 'Transform your bedroom into a personal sanctuary.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Bedroom/bedroom_modern_1.avif',
    icon: <Bed className="w-6 h-6" />,
    hasContent: true
  },
  {
    id: 5,
    title: 'Bathroom',
    subtitle: 'Inner peace of Italy',
    description: 'Luxurious bathrooms that combine functionality with spa-like tranquility.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Greenery-as-fresh-bathroom-decor-ideas-by-Decorilla-designer-Casey-H._i7fhfe.jpg',
    icon: <Bath className="w-6 h-6" />,
    hasContent: true
  },
  {
    id: 6,
    title: 'Lighting',
    subtitle: 'Outshine the standard',
    description: 'Illuminate your space with our carefully curated lighting solutions.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/led-lighting-1_0_sklvzy.jpg',
    icon: <Lightbulb className="w-6 h-6" />,
    hasContent: true
  }
];

const Projects = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<ProjectOption | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollManager = useScrollManager();

  const toggleScrollLock = (lock: boolean) => {
    if (lock) {
      scrollManager.lockScroll();
    } else {
      scrollManager.unlockScroll();
    }
  };

  useEffect(() => {
    if (showInitialAnimation) {
      setTimeout(() => {
        setShowInitialAnimation(false);
      }, 2000);
    }
  }, [showInitialAnimation]);

  useEffect(() => {
    return () => {
      if (isModalOpen) {
        scrollManager.unlockScroll();
      }
    };
  }, [isModalOpen]);

  const handleOptionClick = async (option: ProjectOption) => {
    if (option.hasContent) {
      if (activeId === option.id) {
        setSelectedOption(option);
        setIsModalOpen(true);
        toggleScrollLock(true);
      } else {
        setActiveId(option.id);
        setSelectedOption(null);
        setShowInitialAnimation(true);
      }
    }
  };

  const handleStyleClick = async (style: Style) => {
    if (selectedOption) {
      setSelectedStyle(style);
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    setSelectedStyle(null);
    setIsModalOpen(false);
    toggleScrollLock(false);
  };

  return (
    <section
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen bg-white py-20"
    >
      <style>{`
        .project-container {
          display: flex;
          gap: 1rem;
          padding: 2rem;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          height: 600px;
        }

        .project-card {
          position: relative;
          flex: 1;
          min-width: 0;
          border-radius: 2rem;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card.active {
          flex: 2.5;
        }

        .project-card:not(.active) {
          flex: 0.5;
        }

        .card-content {
          position: absolute;
          inset: 0;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        @keyframes continuousPulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
        }

        @keyframes initialPulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
        }

        .haptic-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card.active .haptic-overlay {
          opacity: 1;
          animation: continuousPulse 2s ease-in-out infinite;
        }

        .project-card.active .haptic-overlay.initial {
          animation: initialPulse 1s ease-in-out 2;
        }

        .project-card.active:hover .haptic-overlay {
          animation: continuousPulse 1.5s ease-in-out infinite;
        }

        .card-icon {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          transition: all 0.5s ease;
        }

        .project-card:not(.active) .card-icon {
          animation: pulse 2s infinite;
        }

        .project-card.active .card-icon {
          left: 2rem;
          transform: translateX(0);
          animation: none;
        }

        .card-text {
          position: absolute;
          bottom: 6rem;
          left: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .project-card.active .card-text {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 1024px) {
          .project-container {
            height: 500px;
          }

          .project-card.active {
            flex: 2;
          }
        }

        @media (max-width: 768px) {
          .project-container {
            height: 400px;
          }

          .project-card:not(.active) {
            flex: 0.3;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-serif text-center">Crafted Spaces</h2>
      </div>

      <div ref={cardsRef} className="project-container">
        {projectOptions.map((project) => (
          <div
            key={project.id}
            className={`project-card ${activeId === project.id ? 'active' : ''}`}
            onClick={() => handleOptionClick(project)}
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {activeId === project.id && (
              <div 
                className={`haptic-overlay ${
                  showInitialAnimation ? 'initial' : ''
                }`}
              />
            )}

            <div className="card-content">
              <div className="card-icon">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  {project.icon}
                </div>
              </div>
              <div className="card-text">
                <h3 className="text-white/90 text-xl font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-white/90 text-bold leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOption && !selectedStyle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <div 
            className="relative w-full max-w-5xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute -top-2 -right-2 p-2 text-white hover:text-gray-300 transition-colors duration-300 bg-black/50 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex justify-center space-x-8">
              {styles.map((style, index) => (
                <div
                  key={style.id}
                  className="w-64 h-64 bg-white rounded-lg p-8 cursor-pointer transform transition-all duration-500 hover:shadow-xl"
                  style={{
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`,
                    opacity: 0,
                    transform: 'translateY(50px)',
                  }}
                  onClick={() => handleStyleClick(style)}
                >
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
                    {style.icon}
                    <span className="text-xl text-gray-800 font-sans">
                      {style.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedStyle && selectedOption && (
        <ImageGallery
          category={selectedOption.title}
          style={selectedStyle.name}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Projects;