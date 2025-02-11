import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Craftsmanship = () => {
  return (
    <section id="italian-craftsmanship" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <AnimatedSection>
              <div className="space-y-4">
                <h2 className="text-6xl font-serif">How we transform your home</h2>
                <p className="text-[#B49157] uppercase tracking-wider">
                  From Vision to Reality – A Seamless Luxury Experience
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-gray-600 text-lg leading-relaxed">
                At D&D Design Center, we transform your vision into reality through a seamless, personalized journey. From expert consultation and bespoke customization to flawless execution and white-glove delivery, every detail is designed to exceed expectations.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience unparalleled craftsmanship, world-class service, and timeless luxury tailored to you.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <Link 
                to="/how-we-work"
                className="inline-block px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200"
              >
                See how we work
              </Link>
            </AnimatedSection>
          </div>

          <AnimatedSection className="relative h-96" delay={300}>
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg transform transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage:
                  'url("https://res.cloudinary.com/dnddesigncenter/image/upload/DND_hidm18.avif")',
              }}
            ></div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;