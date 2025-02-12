import { useState, useEffect } from 'react';
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

  function triggerFooterContact(): void {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      
    // Calculate the total scroll height
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
      
    // Scroll to the bottom of the page
    window.scrollTo({
      top: scrollHeight - windowHeight,
      behavior: 'smooth'
    });

    // Wait for scroll to complete, then trigger the contact button
    setTimeout(() => {
      const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement | null;
      if (footerContactBtn) {
        footerContactBtn.click();
      }
    }, 800); // Increased delay to ensure scroll completes
    }
    }

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        triggerFooterContact={triggerFooterContact}
      />
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