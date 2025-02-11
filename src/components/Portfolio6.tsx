"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Portfolio6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Portfolio</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Explore Our Luxury Projects
          </h2>
          <p className="md:text-md">
            Transforming Spaces with Elegance and Style
          </p>
        </div>
        <div className="columns-1 after:block md:columns-2 md:gap-x-8 lg:gap-x-12">
          <article className="mb-12 break-inside-avoid">
            <div className="mb-5 md:mb-6">
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              <a href="#">Modern Kitchen</a>
            </h3>
            <p>A sleek and functional space for culinary creativity.</p>
            <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Modern Design
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Elegant Finishes
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Open Concept
                </a>
              </li>
            </ul>
            <Button
              title="View project"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-5 md:mt-6"
            >
              <a href="#">View project</a>
            </Button>
          </article>
          <article className="mb-12 break-inside-avoid">
            <div className="mb-5 md:mb-6">
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              <a href="#">Art Deco Living</a>
            </h3>
            <p>
              A luxurious space that combines vintage charm with modern comfort.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Art Deco
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Chic Style
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Timeless Elegance
                </a>
              </li>
            </ul>
            <Button
              title="View project"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-5 md:mt-6"
            >
              <a href="#">View project</a>
            </Button>
          </article>
          <article className="mb-12 break-inside-avoid">
            <div className="mb-5 md:mb-6">
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              <a href="#">Traditional Dining</a>
            </h3>
            <p>Classic design elements that bring warmth to every meal.</p>
            <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Classic Charm
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Family Friendly
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Inviting Atmosphere
                </a>
              </li>
            </ul>
            <Button
              title="View project"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-5 md:mt-6"
            >
              <a href="#">View project</a>
            </Button>
          </article>
          <article className="mb-12 break-inside-avoid">
            <div className="mb-5 md:mb-6">
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              <a href="#">Stylish Bedroom</a>
            </h3>
            <p>A serene retreat designed for relaxation and comfort.</p>
            <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Cozy Retreat
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Modern Aesthetic
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Functional Design
                </a>
              </li>
            </ul>
            <Button
              title="View project"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-5 md:mt-6"
            >
              <a href="#">View project</a>
            </Button>
          </article>
        </div>
        <div className="mt-12 flex justify-center md:mt-18 lg:mt-20">
          <Button title="View all" variant="secondary" size="primary">
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Portfolio6;