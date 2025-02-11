import React from 'react';

const HeroImage = () => {
  return (
    <section className="relative min-h-[400px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://res.cloudinary.com/dnddesigncenter/image/upload/background_pjnycs.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-black/1"></div>
      </div>
      
      <div className="relative h-full min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
         
        </h2>
      </div>
    </section>
  );
};

export default HeroImage;