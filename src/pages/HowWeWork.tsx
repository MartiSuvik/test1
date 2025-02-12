import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  Pencil,
  PenTool as Tool,
  MapPin,
  X,
  ChevronDown,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';

gsap.registerPlugin(ScrollTrigger);

interface Stage {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  details: string[];
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
  rating: number;
}

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  results: string[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nataliya Narizhna',
    position: 'Customer',
    quote:
      'Beautiful store with great selection of unique and high quality furniture. Very happy with the service, Dmitriy is an amazing sales person, we have been ordering with him for years. Good prices as opposed to other high end furniture stores. Highly recommend.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anna Ka',
    position: 'Customer',
    quote:
      'Its truly a place with a big selection of designs and designers for kitchen, dining room, and bathrooms. Some items are very expensive, some reasonably priced. For me, it was better to see it in the showroom and not in the catalog.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Felix Z',
    position: 'Customer',
    quote: 'Nice selection and good quality furniture',
    rating: 5,
  },
];

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'Bright Contemporary Living Room Renovation – Warm and Inviting Space',
    description:
      'Transform your living area with cozy furniture, wood flooring, and modern lighting to create a contemporary, welcoming atmosphere.',
    beforeImage:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/1_a1zewm.avif',
    afterImage:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/2_llvjjf.avif',
    results: [
      'Handcrafted Italian furnishings & statement lighting',
      'Premium wood flooring with exquisite finishes',
      'Enhanced natural light and refined ambiance',
    ],
  },
  {
    id: 2,
    title: 'Cozy and Stylish Bedroom Makeover – Elegant Modern Home Design',
    description:
      'Upgrade your bedroom with warm lighting, custom-built storage, and a contemporary aesthetic for a cozy yet modern living space.',
    beforeImage:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/5_rmtmur.avif',
    afterImage:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/6_i7srhj.avif',
    results: [
      'Custom-designed storage maximizing space & style',
      'Soft ambient lighting for a serene, luxurious feel',
      'Sophisticated modern design with timeless appeal',
    ],
  },
  {
    id: 3,
    title: 'Modern Bathroom Makeover – Sleek and Stylish Home Renovation',
    description:
      'Discover a luxurious modern bathroom transformation featuring a walk-in shower, elegant fixtures, and contemporary tiles for a sleek finish.',
    beforeImage:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/3_gmlal0.avif',
    afterImage:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/4_mh2y7y.avif',
    results: [
      'Spa-inspired fixtures for a high-end retreat',
      'Intelligent space planning for seamless functionality',
      'Masterfully crafted finishes ensuring lasting elegance',
    ],
  },
];

const HowWeWork = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroArrowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const triggerFooterContact = () => {
    setTimeout(() => {
      const footerContactBtn = document.querySelector(
        '[data-footer-contact]'
      ) as HTMLButtonElement;
      if (footerContactBtn) {
        footerContactBtn.click();
      }
    }, 300);
  };

  const scrollToProjects = () => {
    window.location.href = '/#projects';
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (heroArrowRef.current) {
        gsap.to(heroArrowRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }


      gsap.from('.hero-content', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
      });
    });

    return () => ctx && ctx.revert();
  }, []);

  const stages = [
    {
      id: 1,
      title: 'Consultation',
      description:
        'Visit our **New York** showroom or connect via our website\nfor a **personalized consultation**.',
      icon: <MapPin className="w-8 h-8 text-white" />, // Update icon color to white
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      details: [
        'Personal design consultation',
        'Space assessment',
        'Style preferences discussion',
        'Budget planning',
      ],
    },
    {
      id: 2,
      title: 'Concept',
      description:
        'Receive **tailored sketches** that bring your **vision to life**.',
      icon: <Pencil className="w-8 h-8 text-white" />, // Update icon color to white
      image:
        'https://images.unsplash.com/photo-1600428610161-e98636332e98?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      details: [
        'Detailed sketches',
        '3D visualizations',
        'Material selections',
        'Color palette development',
      ],
    },
    {
      id: 3,
      title: 'Craftsmanship',
      description:
        '**Experience** exquisite Italian craftsmanship where every detail is meticulously **executed to perfection**.',
      icon: <Tool className="w-8 h-8 text-white" />, // Update icon color to white
      image:
        'https://images.unsplash.com/photo-1553051021-9f94520a6cad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      details: [
        'Master artisan selection',
        'Premium material sourcing',
        'Handcrafted excellence',
        'Quality assurance',
      ],
    },
    {
      id: 4,
      title: 'Delivery',
      description:
        'Your bespoke order is prepared and delivered with flawless precision, **ensuring your space** is transformed **effortlessly**.',
      icon: <Compass className="w-8 h-8 text-white" />, // Update icon color to white
      image:
        'https://images.unsplash.com/photo-1464029902023-f42eba355bde?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      details: [
        'White glove delivery',
        'Professional installation',
        'Final inspection',
        'Client walkthrough',
      ],
    },
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!wrapperRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      const stageSections = gsap.utils.toArray<HTMLElement>('.stage-section');

      if (wrapperRef.current) {
        gsap.set(wrapperRef.current, { opacity: 1, overflow: 'visible' });
      }

      if (stageSections.length > 0) {
        gsap.fromTo(
          stageSections[0],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stageSections[0],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const totalWidth =
        stageSections.reduce(
          (acc, section) => acc + section.offsetWidth * 0.8,
          0
        ) +
        (stageSections.length - 1) * 20;

      gsap.set(lineRef.current, { x: 0 });

      const horizontalTween = gsap.to(stageSections, {
        xPercent: -100 * (stageSections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (stageSections.length - 1),
          start: 'top top',
          end: () => `+=${totalWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.to(lineRef.current, {
              x: self.progress * (totalWidth - window.innerWidth) * 0.2,
              ease: 'none',
              duration: 0.3,
            });
          },
        },
      });

      stageSections.forEach((section) => {
        const text = section.querySelector('.stage-text') as HTMLElement | null;
        if (text) {
          gsap.fromTo(
            text,
            { x: '100%', opacity: 0 },
            {
              x: '0%',
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                containerAnimation: horizontalTween,
                start: 'left center',
                end: 'right center+=200',
                scrub: true,
              },
            }
          );
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const metricsCtx = gsap.context(() => {
      const metrics = [
        { el: '.metric-clients', value: 500, suffix: '+' },
        { el: '.metric-projects', value: 1200, suffix: '+' },
        { el: '.metric-satisfaction', value: 98, suffix: '%' },
        { el: '.metric-years', value: 10, suffix: '+' },
      ];

      metrics.forEach(({ el, value, suffix }) => {
        const element = document.querySelector(el);
        if (element) {
          element.textContent = '0';

          gsap.to(element, {
            duration: 2,
            textContent: value,
            roundProps: 'textContent',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              once: true,
            },
            onUpdate: function () {
              const target = this.targets()[0];
              if (!target) return;
              element.textContent =
                Math.floor(Number(target.textContent)) + suffix;
            },
          });
        }
      });
    });

    return () => metricsCtx.revert();
  }, []);

  const handleSliderInteraction = (index: number, clientX: number) => {
    const slider = sliderRefs.current[index];
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;

    const afterImage = slider.querySelector('.after-image') as HTMLElement;
    if (afterImage) {
      afterImage.style.transition = 'none'; // Remove transition delay
      afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navbar 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        triggerFooterContact={triggerFooterContact}
      />

      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-[1.1] transition-transform duration-1000"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dnddesigncenter/image/upload/Untitled_design_5_rnem1n.avif')",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
        <div className="relative z-10 text-center px-4 hero-content">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            How We Work
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience our meticulous process of transforming spaces through
            Italian craftsmanship and design excellence
          </p>
        </div>
        <div
          ref={heroArrowRef}
          onClick={scrollToTimeline}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-10 transition-transform duration-300 hover:scale-110"
        >
          <ChevronDown className="w-12 h-12 text-white" />
        </div>
      </section>

      <section
        ref={wrapperRef}
        className="relative h-screen overflow-hidden bg-[#1A1A1A]"
      >
        <div
          ref={lineRef}
          className="absolute top-1/2 left-0 w-[200vw] h-1 bg-[#C5A267] opacity-80"
        />

        <div
          ref={containerRef}
          className="absolute h-full flex w-full"
          style={{ willChange: 'transform' }}
        >
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="stage-section w-[80vw] h-full flex-shrink-0 flex justify-center items-center"
            >
              <div className="relative w-full max-w-4xl px-4 h-full flex flex-col justify-center">
                <div className="text-center mb-3">
                  <span className="text-[#C5A267] text-sm tracking-widest uppercase">
                    Stage {stage.id}
                  </span>
                </div>
                <h2 className="text-4xl font-serif text-white text-center mb-3">
                  {stage.title}
                </h2>

                <div className="relative w-full max-w-2xl mx-auto mb-3 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                      {stage.icon}
                    </div>
                  </div>
                  <div className="stage-text absolute top-0 right-0 h-full w-1/2 p-4 flex flex-col justify-center text-left">
                    <p className="text-white/80 text-lg mb-6 leading-loose whitespace-pre-line break-words">
                      {stage.description
                        .split(/(\*\*.*?\*\*)/g)
                        .map((part, index) =>
                          part.startsWith('**') && part.endsWith('**') ? (
                            <strong
                              key={index}
                              className="text-white font-bold"
                            >
                              {part.replace(/\*\*/g, '')}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                    </p>
                    <div className="grid grid-cols-1 gap-y-3">
                      {stage.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 text-white/90"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#C5A267] flex-shrink-0" />
                          <span className="text-base">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={metricsRef} className="relative py-24 bg-[#F5F5F5]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F5F5F5]/10" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                class: 'metric-clients',
                label: 'Satisfied Clients',
                suffix: '+',
              },
              {
                class: 'metric-projects',
                label: 'Completed Projects',
                suffix: '+',
              },
              {
                class: 'metric-satisfaction',
                label: 'Client Satisfaction Rate',
                suffix: '%',
              },
              {
                class: 'metric-years',
                label: 'Years of Excellence',
                suffix: '+',
              },
            ].map((metric) => (
              <div
                key={metric.class}
                className="bg-white rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div
                  className={`${metric.class} text-6xl font-serif text-[#1A1A1A] mb-2 font-bold`}
                >
                  0{metric.suffix}
                </div>
                <div className="text-gray-600 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={caseStudiesRef} className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-white text-center mb-16">
            Featured Transformations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className="bg-[#262626] rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div
                  ref={(el) => (sliderRefs.current[index] = el!)}
                  className="relative aspect-[4/3] cursor-ew-resize group"
                  onMouseMove={(e) => handleSliderInteraction(index, e.clientX)}
                  onTouchMove={(e) =>
                    handleSliderInteraction(index, e.touches[0].clientX)
                  }
                >
                  <img
                    src={study.afterImage}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="after-image absolute inset-0 w-full h-full"
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                  >
                    <img
                      src={study.beforeImage}
                      alt="Before"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-sm bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                      Slide to compare
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-white mb-3">
                    {study.title}
                  </h3>
                  <p className="text-white/60 mb-6 text-sm leading-relaxed">
                    {study.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    {study.results.map((result, i) => (
                      <div
                        key={i}
                        className="flex items-center text-[#C4A661] text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C4A661] mr-3 flex-shrink-0" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dnddesigncenter/image/upload/Untitled_design_5_rnem1n.avif')] bg-cover bg-center opacity-30 parallax-bg" />
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-serif text-white mb-4">
            Transform Your Vision Into Reality
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Book Your Complimentary Consultation
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={triggerFooterContact}
              className="px-8 py-4 bg-[#C4A661] text-black text-lg font-medium rounded hover:scale-105 transition-all duration-300"
            >
              Schedule Consultation
            </button>
            <button
              onClick={scrollToProjects}
              className="px-8 py-4 border border-white text-white text-lg font-medium rounded hover:scale-105 transition-all duration-300"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {activeStage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={() => setActiveStage(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#1A1A1A] rounded-lg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveStage(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  {activeStage.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white">
                    {activeStage.title}
                  </h3>
                  <span className="text-[#C5A267] text-sm">
                    Stage {activeStage.id}
                  </span>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed">
                {activeStage.description}
              </p>
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-white font-medium mb-4">Process Details</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeStage.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-center space-x-3 text-white/60"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A267]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer ref={footerRef} />
    </div>
  );
};

export default HowWeWork;