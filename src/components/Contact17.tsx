"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export const Contact17: React.FC = () => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3 md:gap-y-16">
          <div>
            <div className="mb-5 lg:mb-6">
              <BiEnvelope className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Contact
            </h3>
            <p className="mb-5 md:mb-6">
              We'd love to hear from you. Reach out to us anytime!
            </p>
            <a className="underline" href="#">
              info@dddesigncenter.com
            </a>
          </div>
          <div>
            <div className="mb-5 lg:mb-6">
              <BiPhone className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Phone
            </h3>
            <p className="mb-5 md:mb-6">
              Call us for inquiries or assistance with your projects.
            </p>
            <a className="underline" href="#">
              +1 (212) 555-1234
            </a>
          </div>
          <div>
            <div className="mb-5 lg:mb-6">
              <BiMap className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Office
            </h3>
            <p className="mb-5 md:mb-6">
              Visit us to explore our latest designs and collections.
            </p>
            <a className="underline" href="#">
              456 Design Ave, New York, NY 10001
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact17;