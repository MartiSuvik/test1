import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useScrollManager } from '../hooks/useScrollManager';
import { ChevronUp, X, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Footer = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const expandedContentRef = useRef<HTMLDivElement>(null);
  const scrollManager = useScrollManager();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollManager.isScrollLocked()) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        
        const isNearBottom = scrollTop + windowHeight > documentHeight - 100;
        setIsVisible(isNearBottom);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (expandedContentRef.current) {
      gsap.to(expandedContentRef.current, {
        height: isExpanded ? 'auto' : '0',
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }
  }, [isExpanded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('idle');
        setIsExpanded(false);
      }, 2000);
    } catch (error) {
      setFormStatus('error');
    }
  };

  const scrollToSection = (sectionId: string) => {
    setIsExpanded(false);
    
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer
      id="footer"
      ref={ref}  // Ref attached here
      className={`fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ zIndex: 30 }}
    >
      {/* Minimized Footer */}
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-block transition-transform duration-200 hover:scale-105"
            aria-label="D&D Design Center - Homepage"
          >
            <img
              src="https://res.cloudinary.com/dnddesigncenter/image/upload/D_D_h52kdi.svg"
              alt="D&D Design Center"
              className="w-auto h-[40px] max-w-[120px] object-contain"
            />
          </Link>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              data-footer-contact
              className="px-6 py-2 bg-[#C5A267] hover:bg-[#B49157] text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <span>Contact Us</span>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden md:flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors duration-200 group"
            >
              <span>Back to top</span>
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Footer */}
      <div
        ref={expandedContentRef}
        className="overflow-hidden h-0"
        style={{ backgroundColor: '#fafafa' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C5A267] focus:border-[#C5A267] transition-shadow duration-200"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C5A267] focus:border-[#C5A267] transition-shadow duration-200"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C5A267] focus:border-[#C5A267] transition-shadow duration-200 resize-none"
                    required
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'success'}
                  className={`w-full py-3 px-4 rounded-lg text-white text-sm font-medium transition-all duration-200 ${
                    formStatus === 'success'
                      ? 'bg-green-500'
                      : formStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-[#C5A267] hover:bg-[#B49157]'
                  }`}
                >
                  {formStatus === 'success' ? 'Message Sent!' : formStatus === 'error' ? 'Try Again' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Company Info & Navigation */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Navigation</h3>
                <nav className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="text-left text-sm text-gray-600 hover:text-[#C5A267] transition-colors duration-200"
                  >
                    Crafted Spaces
                  </button>
                  <button
                    onClick={() => scrollToSection('collections')}
                    className="text-left text-sm text-gray-600 hover:text-[#C5A267] transition-colors duration-200"
                  >
                    Collections
                  </button>
                  <button
                    onClick={() => scrollToSection('italian-craftsmanship')}
                    className="text-left text-sm text-gray-600 hover:text-[#C5A267] transition-colors duration-200"
                  >
                    Italian Excellence
                  </button>
                  <button
                    onClick={() => scrollToSection('history')}
                    className="text-left text-sm text-gray-600 hover:text-[#C5A267] transition-colors duration-200"
                  >
                    History
                  </button>
                  <Link
                    to="/sustainability"
                    className="text-sm text-gray-600 hover:text-[#C5A267] transition-colors duration-200"
                    onClick={() => setIsExpanded(false)}
                  >
                    Sustainability
                  </Link>
                  <Link
                    to="/privacy"
                    className="text-sm text-gray-600 hover:text-[#C5A267] transition-colors duration-200"
                    onClick={() => setIsExpanded(false)}
                  >
                    Privacy Policy
                  </Link>
                </nav>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#C5A267]" />
                    <span>2615 East 17th Street
Brooklyn, New York 11235, USA</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#C5A267]" />
                    <span>(718) 934-7100</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#C5A267]" />
                    <span>info@dnddesigncenter.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[300px] rounded-lg overflow-hidden">
              <iframe
                title="D&D Design Center Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ 
                  border: 0
                }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBLSNeo65Xg4Imwlxq-2GGCARWAIjVk5Ek&q=2615 East 17th Street, Brooklyn, New York 11235, USA&zoom=15`}
                allowFullScreen
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} D&D Design Center. All rights reserved.
            </p>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
