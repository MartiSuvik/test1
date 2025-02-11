import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { Leaf, Factory, Recycle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PillarCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  hoverImage: string;
}

const PillarCard: React.FC<PillarCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: mousePosition.x - 50,
        y: mousePosition.y - 50,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300 hover:scale-105"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          ref={iconRef}
          className="mb-6 transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 20px rgba(74, 107, 71, 0.5))'
              : 'none',
          }}
        >
          <Icon className="w-16 h-16 text-[#4A6B47]" />
        </div>
        <h3 className="text-xl font-serif mb-4 text-[#2C3E2B] transform transition-all duration-300 group-hover:translate-y-[-5px]">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-800">
          {description}
        </p>
      </div>
    </div>
  );
};

interface StatisticCardProps {
  value: string;
  label: string;
  index: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ value, label }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (
      !hasAnimated &&
      cardRef.current &&
      numberRef.current &&
      !prefersReducedMotion
    ) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            onEnter: () => {
              setHasAnimated(true);
              gsap.to(numberRef.current, {
                duration: 2,
                textContent: numericValue,
                snap: { textContent: 1 },
                ease: 'power2.out',
              });
            },
            once: true,
          },
        }
      );

      gsap.to(cardRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, [value, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="text-center transform hover:scale-105 transition-all duration-300 p-8 rounded-xl hover:shadow-lg relative z-10"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div
        ref={numberRef}
        className="text-4xl md:text-5xl font-bold text-[#4A6B47] mb-2"
        style={{
          textShadow: '0 0 20px rgba(74, 107, 71, 0.2)',
        }}
      >
        0
      </div>
      <div className="text-sm text-gray-600 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const AnimatedGraph = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated && pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: path,
          start: 'top 80%',
          onEnter: () => setHasAnimated(true),
          once: true,
        },
      });
    }
  }, [hasAnimated]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 400"
      >
        <path
          ref={pathRef}
          d="M0,300 Q250,280 500,200 T1000,100"
          fill="none"
          stroke="#E8F5E9"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

interface TooltipPosition {
  top: string;
  left: string;
}

const tooltipPositions: Record<string, TooltipPosition> = {
  chair: {
    top: '60%',
    left: '70%',
  },
  cabinet: {
    top: '40%',
    left: '30%',
  },
};

const Sustainability = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const approachRef = useRef(null);
  const approachTitleRef = useRef(null);
  const approachTextRef = useRef(null);
  const sliderRef = useRef(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [currentSlide] = useState(0);
  const midSectionImageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      }
    );

    gsap.fromTo(
      heroTextRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
      }
    );

    if (
      approachRef.current &&
      approachTitleRef.current &&
      approachTextRef.current
    ) {
      gsap.to(approachRef.current, {
        backgroundColor: 'rgba(74, 107, 71, 0.05)',
        scrollTrigger: {
          trigger: approachRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      gsap.fromTo(
        approachTitleRef.current,
        {
          opacity: 0,
          scale: 0.9,
          textShadow: '0 0 0 rgba(74, 107, 71, 0)',
        },
        {
          opacity: 1,
          scale: 1,
          textShadow: '0 0 20px rgba(74, 107, 71, 0.3)',
          duration: 1,
          scrollTrigger: {
            trigger: approachTitleRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.to(approachTitleRef.current, {
        textShadow: '0 0 30px rgba(74, 107, 71, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.fromTo(
        approachTextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: approachTextRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    const slides = sliderRef.current?.children;
    if (slides) {
      gsap.to(slides, {
        xPercent: -100 * currentSlide,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    if (midSectionImageRef.current) {
      gsap.fromTo(
        midSectionImageRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: midSectionImageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [currentSlide]);

  const handleImageHover = (index: number) => {
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        scale: 1.05,
        rotationY: 5,
        rotationX: 3,
        boxShadow: '0 20px 40px rgba(74, 107, 71, 0.3)',
        duration: 0.3,
      });
    }
  };

  const handleImageLeave = (index: number) => {
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 10px 20px rgba(74, 107, 71, 0.1)',
        duration: 0.3,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <section className="relative h-screen overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dnddesigncenter/image/upload/sustainability_1_yo0sh6.avif"
            alt="Sustainable Forest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div
          ref={heroTextRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">
              Lower Impact Journey
            </h1>
            <p className="text-xl md:text-2xl font-light">
              The path to reduce the environmental footprint
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4">
        <ParticleBackground containerId="pillars-particles" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <PillarCard
            index={0}
            icon={Leaf}
            title="Sustainable Sourcing"
            description="Responsibly sourced materials from certified suppliers, ensuring environmental preservation"
            hoverImage="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=2096&auto=format&fit=crop"
          />
          <PillarCard
            index={1}
            icon={Factory}
            title="Zero Waste Manufacturing"
            description="Innovative production processes that minimize waste and maximize resource efficiency"
            hoverImage="https://images.unsplash.com/photo-1530587191325-3db1d0ed0d39?q=80&w=2096&auto=format&fit=crop"
          />
          <PillarCard
            index={2}
            icon={Recycle}
            title="Circular Design"
            description="Products designed for longevity, repair, and eventual recycling"
            hoverImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
          />
        </div>
      </section>

      <section className="py-16 px-4">
        <div
          ref={midSectionImageRef}
          className="max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl relative"
        >
          <div className="aspect-w-16 aspect-h-9 relative">
            <img
              src="https://res.cloudinary.com/dnddesigncenter/image/upload/dada_design-76g-UdCbEVU-unsplash_converted_g8oh74.avif"
              alt="Sustainable Design"
              className="w-full h-full object-cover"
            />

            <div
              className="item-hints absolute"
              style={{
                top: tooltipPositions.chair.top,
                left: tooltipPositions.chair.left,
              }}
            >
              <div className="hint" data-position="4">
                <span className="hint-radius"></span>
                <span className="hint-dot"></span>
                <div className="hint-content">
                  <p>
                    Ergonomically designed chair crafted from sustainable
                    materials. Features recycled aluminum frame and responsibly
                    sourced wood, reducing environmental impact while
                    maintaining premium comfort.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="item-hints absolute"
              style={{
                top: tooltipPositions.cabinet.top,
                left: tooltipPositions.cabinet.left,
              }}
            >
              <div className="hint" data-position="1">
                <span className="hint-radius"></span>
                <span className="hint-dot"></span>
                <div className="hint-content">
                  <p>
                    Modern storage solution using FSC-certified wood and
                    eco-friendly finishes. Modular design allows for easy
                    repairs and component replacements, extending product
                    lifecycle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            .item-hints {
              height: 200px;
              width: 200px;
            }

            .item-hints .hint {
              width: 60px;
              height: 60px;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .item-hints .hint::before {
              background-color: #fff;
              width: 8px;
              height: 8px;
              z-index: 2;
              clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .item-hints .hint::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
              width: 2px;
              height: 2px;
              z-index: 1;
              box-shadow: 0 0 50px 30px rgba(72, 170, 72, 0.3);
              animation: home_hero_item_hints_glow 2s cubic-bezier(0.25, 0.1, 0.2, 1) infinite;
              transition: opacity 0.5s ease;
            }

            @keyframes home_hero_item_hints_glow {
              0% {
                box-shadow: 0 0 30px 5px #48aa48;
              }
              70% {
                box-shadow: 0 0 70px 50px rgba(72, 170, 72, 0);
              }
              100% {
                box-shadow: 0 0 0 50px rgba(72, 170, 72, 0);
              }
            }

            .item-hints .hint-dot {
              z-index: 3;
              border: 1px solid #fff;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              display: block;
              transform: translate(-0%, -0%) scale(0.95);
              animation: home_hero_item_hints_border 2s linear infinite;
              margin: auto;
            }

            @keyframes home_hero_item_hints_border {
              0%, 100% {
                border-color: rgba(255, 255, 255, 0.6);
                transform: translate(-0%, -0%) scale(0.95);
              }
              50% {
                border-color: rgba(255, 255, 255, 0.3);
                transform: translate(-0%, -0%) scale(1);
              }
            }

            .item-hints .hint-radius {
              background-color: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              width: 250px;
              height: 250px;
              position: absolute;
              top: 50%;
              left: 50%;
              margin: -125px 0 0 -125px;
              opacity: 0;
              visibility: hidden;
              transform: scale(0);
              transition: all 0.5s ease;
            }

            .item-hints .hint:hover .hint-radius {
              opacity: 1;
              visibility: visible;
              transform: scale(1);
            }

            .item-hints .hint[data-position="1"] .hint-content {
              top: 85px;
              left: 142%;
              transform: translateY(-176%);
              margin-left: 0;
            }

            .item-hints .hint[data-position="4"] .hint-content {
    bottom: 85px; /* Adjust vertical position */
    right: 142%; /* Use right instead of left to flip horizontally */
    margin-left: 0;
    text-align: right; /* Align text to the right if needed */
}

.item-hints .hint[data-position="4"] .hint-content::before {
    right: 0; /* Position the line to originate from the right */
    left: auto; /* Remove left positioning */
}

.item-hints .hint[data-position="4"] .hint-content::after {
    transform-origin: -115% 0%; /* Set origin to bottom center */
    transform: rotate(0deg); /* Adjust angle to point upwards */
    top: 53%; /* Adjust vertical position */
    left: 62%; /* Center horizontally */
    width: 80px;
    content: "";
    background-color: #fff;
    height: 1px;
    position: absolute;
    opacity: 1;
    transition: opacity 0.5s ease;
    transform: translate(180%, -100%) rotate(47deg); /* Adjust position and angle */
}

            .item-hints .hint-content {
    color: #40b346;
    width: 300px;
    position: absolute;
    z-index: 5;
    padding: 12px 20px; /* Add padding for better spacing */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.7s ease, visibility 0.7s ease;
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.6); /* Slight white background */
    border-radius: 8px; /* Rounded corners */
}

.item-hints .hint:hover .hint-content {
    opacity: 1;
    visibility: visible !important;
}

            .item-hints .hint-content::before {
              width: 0px;
              bottom: 0;
              left: 0;
              content: "";
              background-color: #fff;
              height: 1px;
              position: absolute;
              transition: width 0.4s;
            }

            .item-hints .hint:hover .hint-content::before {
              width: 180px;
              transition: width 0.4s;
            }

            .item-hints .hint-content::after {
              transform-origin: 0 50%;
              transform: rotate(-225deg);
              bottom: 0;
              left: 0;
              width: 80px;
              content: "";
              background-color: #fff;
              height: 1px;
              position: absolute;
              opacity: 1;
              transition: opacity 0.5s ease;
              transition-delay: 0s;
            }

            .item-hints .hint:hover .hint-content::after {
              opacity: 1;
              visibility: visible;
            }
          `}</style>
        </div>
      </section>

      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <AnimatedGraph />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StatisticCard value="47,893+" label="Trees Saved" index={0} />
            <StatisticCard value="75%" label="Waste Reduction" index={1} />
            <StatisticCard
              value="603,782"
              label="Liters of Water Conserved"
              index={2}
            />
          </div>
        </div>
      </section>

      <section
        ref={approachRef}
        className="relative py-24 px-4 overflow-hidden transition-colors duration-1000"
      >
        <ParticleBackground
          containerId="approach-particles"
          className="opacity-70"
        />

        <div className="relative max-w-3xl mx-auto text-center z-10">
          <h2
            ref={approachTitleRef}
            className="text-4xl font-serif mb-8 text-[#4A6B47]"
          >
            The Path to Reduce the Environmental Footprint
          </h2>
          <p ref={approachTextRef} className="text-gray-600 leading-relaxed">
            Our commitment to sustainability goes beyond mere promises. We
            actively work to minimize our environmental impact through
            innovative design, responsible sourcing, and efficient manufacturing
            processes. Every decision we make is guided by our dedication to
            preserving our planet for future generations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'https://images.unsplash.com/photo-1596237563267-84ffd99c80e1?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463_1280.jpg',
            ].map((src, index) => (
              <div
                key={index}
                className="relative group perspective"
                onMouseEnter={() => handleImageHover(index)}
                onMouseLeave={() => handleImageLeave(index)}
              >
                <div className="absolute inset-0 bg-[#4A6B47]/10 rounded-lg filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={src}
                  alt={
                    index === 0
                      ? 'Sustainable Materials'
                      : 'Eco-friendly Furniture'
                  }
                  className="w-full h-[400px] object-cover rounded-lg transition-all duration-300"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 20px rgba(74, 107, 71, 0.1)',
                    border: '1px solid rgba(74, 107, 71, 0.1)',
                  }}
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-[#4A6B47]/20 group-hover:ring-[#4A6B47]/40 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-[#4A6B47]/10 to-[#8BA888]/10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-3xl font-serif mb-6">
            Sustainable living starts here
          </h3>
          <button
            className="group px-8 py-3 bg-[#4A6B47] text-white rounded-lg transition-all duration-300 hover:bg-[#3A5A37] relative overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(74, 107, 71, 1)',
            }}
          >
            <span className="relative z-10 block transition-transform duration-300 group-hover:scale-105">
              Explore Our Collection
            </span>
            <div className="absolute inset-0 bg-[#3A5A37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sustainability;