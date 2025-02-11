import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import Projects from '../components/Projects';
import Craftsmanship from '../components/Craftsmanship';
import History from '../components/History';
import HeroImage from '../components/HeroImage';
import Footer from '../components/Footer';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar isScrolled={isScrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="pb-16">
        <Hero />
        <Projects />
        <Collections />
        <Craftsmanship />
        <History />
        <HeroImage />
      </main>
      <Footer />
    </div>
  );
}

export default Home;