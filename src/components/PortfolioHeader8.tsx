"use client";

import React from "react";

const PortfolioHeader8: React.FC = () => {
  return (
    <section id="relume" className="relative px-[5%]">
      <div className="absolute inset-0 -z-[1]">
        <img
          src="https://res.cloudinary.com/dnddesigncenter/image/upload/Kitchen_ArtDeco_32_nkpgsz.avif"
          alt="Relume placeholder image 1"
          className="size-full object-cover"
        />
        <span className="absolute inset-0 z-10 bg-black/50" />
      </div>
      <div className="flex min-h-svh items-center justify-center">
        <div className="container text-center mx-auto">
          <div className="grid grid-cols-1 items-start gap-12 py-16 md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div className="mx-auto">
              <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
                Projects
              </h1>
              <p className="text-text-alternative md:text-md">
                Discover our curated projects that redefine modern luxury in
                home decor and design.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-text-alternative" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioHeader8;
