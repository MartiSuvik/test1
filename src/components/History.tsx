import { useScrollAnimation } from '../hooks/useScrollAnimation';

const milestones = [
  {
    year: '2005',
    title: 'Foundation',
    description: 'D&D Design Center was established in Milan, Italy.'
  },
  {
    year: '2010',
    title: 'International Expansion',
    description: 'Opened our first international showroom.'
  },
  {
    year: '2015',
    title: 'Design Excellence Award',
    description: 'Received prestigious recognition for innovative design solutions.'
  },
  {
    year: '2020',
    title: 'Sustainable Initiative',
    description: 'Launched our commitment to sustainable luxury design.'
  },
  {
    year: '2025',
    title: 'Expanded Team',
    description: 'Launched several digital projects to promote sustainable luxury design.'
  },
];

const History = () => {
  const sectionRef = useScrollAnimation({ 
    progressive: true,
    duration: 1.5,
    stagger: 0.4,
    delay: 0.3,
    markers: false
  });

  return (
    <section ref={sectionRef} id="history" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-16">Our History</h2>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#C5A267]"></div>
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#C5A267] rounded-full"></div>
                
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className={`bg-white p-6 rounded-lg shadow-lg ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <span className="text-[#C5A267] text-xl font-bold">{milestone.year}</span>
                    <h3 className="text-xl font-serif mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;