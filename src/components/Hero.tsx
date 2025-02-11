import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToCollections = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const collectionsSection = document.getElementById('projects');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src="https://res.cloudinary.com/dnddesigncenter/video/upload/f_auto/q_50/br_600k/v1738173230/hero-video_wso273.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      {/* Scroll Down Button */}
      <button
        onClick={scrollToCollections}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white hover:text-[#C5A267] transition-colors duration-300"
        aria-label="Scroll to collections"
      >
        <ChevronDown className="w-12 h-12 animate-pulse-down" />
      </button>
    </div>
  );
};

export default Hero;