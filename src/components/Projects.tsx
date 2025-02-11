import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollManager } from '../hooks/useScrollManager';
import ImageGallery from './ImageGallery';

gsap.registerPlugin(ScrollTrigger);

interface ProjectOption {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hasContent: boolean;
}

interface Style {
  id: number;
  name: string;
}

const styles: Style[] = [
  {
    id: 1,
    name: 'Modern',
  },
  {
    id: 2,
    name: 'Traditional',
  },
  {
    id: 3,
    name: 'Ardeco',
  },
];

const projectOptions: ProjectOption[] = [
  {
    id: 1,
    title: 'Living Room',
    subtitle: 'Elegant Comfort',
    description: 'Experience the perfect blend of luxury and comfort in our meticulously designed living spaces.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Living%20Room/livingroom_traditional_5.avif',
    hasContent: true
  },
  {
    id: 2,
    title: 'Kitchen',
    subtitle: 'Culinary Excellence',
    description: 'Modern kitchens designed for both functionality and aesthetics.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Kitchen/kitchen_modern_5.jpg',
    hasContent: true
  },
  {
    id: 3,
    title: 'Dining Area',
    subtitle: 'Sophisticated Dining',
    description: 'Create memorable moments in our elegantly designed dining spaces.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/3e48fefc776aeb5c41fc951ab88a7d85_xgf8bc.jpg',
    hasContent: true
  },
  {
    id: 4,
    title: 'Bedroom',
    subtitle: 'Luxury Designs',
    description: 'Transform your bedroom into a personal sanctuary.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Bedroom/bedroom_modern_1.avif',
    hasContent: true
  },
  {
    id: 5,
    title: 'Bath',
    subtitle: 'Inner peace of Italy',
    description: 'Luxurious bathrooms that combine functionality with spa-like tranquility.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Greenery-as-fresh-bathroom-decor-ideas-by-Decorilla-designer-Casey-H._i7fhfe.jpg',
    hasContent: true
  },
  {
    id: 6,
    title: 'Lighting',
    subtitle: 'Outshine the standard',
    description: 'Illuminate your space with our carefully curated lighting solutions.',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/led-lighting-1_0_sklvzy.jpg',
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
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-serif text-center">Project Portfolio</h2>
      </div>

      <div ref={cardsRef} className="flex gap-4 p-8 w-full max-w-6xl mx-auto h-[600px]">
        {projectOptions.map((project) => (
          <div
            key={project.id}
            className={`relative flex-1 min-w-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
              activeId === project.id ? 'flex-[2.5]' : 'flex-[0.5]'
            }`}
            onClick={() => handleOptionClick(project)}
          >
            {/* Background image container */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500"
                style={{
                  backgroundImage: `url(${project.image})`,
                  transform: activeId === project.id ? 'scale(1)' : 'scale(1.2)',
                }}
              />
            </div>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Pulse overlay for active card */}
            {activeId === project.id && (
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/80 pointer-events-none z-10 opacity-0 transition-opacity duration-300 ${
                showInitialAnimation ? 'animate-[initialPulse_1s_ease-in-out_2]' : 'animate-[continuousPulse_2s_ease-in-out_infinite]'
              }`} />
            )}

{/* Card content */}
<div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-b from-transparent to-black/70">
  {/* Collapsed state title */}
  {activeId !== project.id && (
    <div className="absolute inset-0 flex items-center justify-center p-3">
      <h3 className="text-white text-center text-lg font-serif leading-tight line-clamp-2 drop-shadow-lg"
          style={{ 
            lineHeight: '1.2',
            wordBreak: 'break-word',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical'
          }}>
        {project.title}
      </h3>
    </div>
  )}

              {/* Expanded state content */}
              {activeId === project.id && (
                <div className="opacity-100 transform translate-y-0 transition-all duration-500">
                  <h3 className="text-white/90 text-2xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedOption && !selectedStyle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
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