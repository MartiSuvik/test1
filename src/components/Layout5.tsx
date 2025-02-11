"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  VideoIframe,
} from "@relume_io/relume-ui";
import React from "react";
import { FaCirclePlay } from "react-icons/fa6";

export const Layout5: React.FC = () => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Elevate</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Transform Your Space with Timeless Elegance
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Experience the perfect blend of style and functionality. Our
              designs enhance your home’s aesthetic while providing unmatched
              comfort.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Quality Assurance
                </h6>
                <p>
                  Crafted with the finest materials for durability and lasting
                  beauty.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Personalized Service
                </h6>
                <p>
                  Tailored solutions that reflect your unique style and
                  preferences.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
          <Dialog>
            <DialogTrigger className="relative flex w-full max-w-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full object-cover"
                alt="Relume placeholder image"
              />
              <FaCirclePlay className="absolute z-20 size-16 text-white" />
              <span className="absolute inset-0 z-10 bg-black/50" />
            </DialogTrigger>
            <DialogContent>
              <VideoIframe video="https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}

export default Layout5;