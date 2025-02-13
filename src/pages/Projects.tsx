import { useState, useEffect, useRef } from 'react';
import Airtable from 'airtable';
import PortfolioHeader8 from "../components/PortfolioHeader8";
import Layout5 from "../components/Layout5";
import Contact17 from "../components/Contact17";
import Contact10 from "../components/Contact10";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  room: string;
  style: string;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 10;

const ProjectGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const rooms = ['Kitchen', 'Living', 'Dining', 'Bedroom', 'Lighting', 'Bath', 'Outdoor'];
  const kitchenStyles = ['Modern', 'Traditional', 'Art Deco'];

  const triggerFooterContact = () => {
    setTimeout(() => {
      const footerContactBtn = document.querySelector(
        '[data-footer-contact]'
      ) as HTMLButtonElement;
      if (footerContactBtn) {
        footerContactBtn.click();
      }
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY })
          .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

        const records = await base('database').select().all();
        
        const fetchedProjects = records.map(record => ({
          id: record.id,
          title: record.fields['Title'] as string,
          room: record.fields['Room'] as string,
          style: record.fields['Style'] as string,
          imageUrl: record.fields['Cloudinary URL'] as string,
        }));

        setProjects(fetchedProjects);
        setVisibleProjects(fetchedProjects.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filteredProjects = [...projects];

    if (selectedRoom !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.room === selectedRoom);
    }

    if (selectedRoom === 'Kitchen' && selectedStyle !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.style === selectedStyle);
    }

    setVisibleProjects(filteredProjects.slice(0, ITEMS_PER_PAGE));
  }, [selectedRoom, selectedStyle, projects]);

  const loadMore = () => {
    const currentLength = visibleProjects.length;
    let filteredProjects = [...projects];

    if (selectedRoom !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.room === selectedRoom);
    }

    if (selectedRoom === 'Kitchen' && selectedStyle !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.style === selectedStyle);
    }

    setVisibleProjects(filteredProjects.slice(0, currentLength + ITEMS_PER_PAGE));
  };

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Room Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center space-x-8">
            <button
              onClick={() => {
                setSelectedRoom('all');
                setSelectedStyle('all');
              }}
              className={`relative px-4 py-2 text-lg uppercase tracking-wider transition-all duration-300 ${
                selectedRoom === 'all'
                  ? 'text-[#B49157]'
                  : 'text-gray-600 hover:text-[#B49157]'
              }`}
            >
              All
              {selectedRoom === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B49157] transform origin-left transition-transform duration-300"></span>
              )}
            </button>
            {rooms.map(room => (
              <button
                key={room}
                onClick={() => {
                  setSelectedRoom(room);
                  setSelectedStyle('all');
                }}
                className={`relative px-4 py-2 text-lg uppercase tracking-wider transition-all duration-300 ${
                  selectedRoom === room
                    ? 'text-[#B49157]'
                    : 'text-gray-600 hover:text-[#B49157]'
                }`}
              >
                {room}
                {selectedRoom === room && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B49157] transform origin-left transition-transform duration-300"></span>
                )}
              </button>
            ))}
          </div>

          {/* Style Filter (only for Kitchen) */}
          {selectedRoom === 'Kitchen' && (
            <div className="flex justify-center space-x-8 mt-8">
              <button
                onClick={() => setSelectedStyle('all')}
                className={`relative px-4 py-2 text-lg uppercase tracking-wider transition-all duration-300 ${
                  selectedStyle === 'all'
                    ? 'text-[#B49157]'
                    : 'text-gray-600 hover:text-[#B49157]'
                }`}
              >
                All Styles
                {selectedStyle === 'all' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B49157] transform origin-left transition-transform duration-300"></span>
                )}
              </button>
              {kitchenStyles.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`relative px-4 py-2 text-lg uppercase tracking-wider transition-all duration-300 ${
                    selectedStyle === style
                      ? 'text-[#B49157]'
                      : 'text-gray-600 hover:text-[#B49157]'
                  }`}
                >
                  {style}
                  {selectedStyle === style && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B49157] transform origin-left transition-transform duration-300"></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-serif text-white mb-2">{project.title}</h3>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                          {project.room}
                        </span>
                        {project.style && (
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                            {project.style}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleProjects.length < projects.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors duration-200"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer ref={footerRef} />
    </div>
  );
};

export default function Projects() {
    // Use state for Navbar, just as in Home.tsx
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    // This function scrolls to the Footer mounted on the current page
    const triggerFooterContact = () => {
      if (footerRef.current) {
        // Scroll to the footer smoothly
        footerRef.current.scrollIntoView({ behavior: 'smooth' });
        // Once scrolling completes, wait a bit and trigger the contact button
        setTimeout(() => {
          const footerContactBtn = footerRef.current!.querySelector('[data-footer-contact]') as HTMLButtonElement | null;
          if (footerContactBtn) {
            footerContactBtn.click();
          }
        }, 800);
      }
    };

  return (
    <div>
      <Navbar 
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        triggerFooterContact={triggerFooterContact}
      />
      <PortfolioHeader8 />
      <ProjectGallery />
      <Layout5 />
      <Contact17 />
      <Contact10 />
      <Footer ref={footerRef} id="footer" />
    </div>
  );
}