import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

interface ParticlesBackgroundProps {
  containerId?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ 
  containerId = "particles-js" 
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  return (
    <Particles
      id={containerId}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: false, // Disable fullscreen to contain particles within the div
        particles: {
          number: {
            value: 80, // Reduced number for better performance
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#4A6B47" // Updated to match the theme color
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: {
            value: 0.3, // Reduced opacity for subtlety
            random: false,
            anim: {
              enable: false,
              speed: 0.1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 2, // Smaller particles
            random: true,
            anim: {
              enable: false,
              speed: 20,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4A6B47", // Updated to match the theme color
            opacity: 0.2, // Reduced opacity for lines
            width: 1
          },
          move: {
            enable: true,
            speed: 1, // Slower movement
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5 // Increased opacity on hover
              }
            },
            push: {
              particles_nb: 2 // Reduced number of particles added on click
            }
          }
        },
        retina_detect: true
      }}
      className="absolute inset-0"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

export default ParticlesBackground;