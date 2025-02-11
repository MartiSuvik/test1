import React from 'react';

const newsItems = [
  {
    id: 1,
    title: 'New Showroom Opening in Milan',
    date: 'March 15, 2024',
    excerpt: 'Join us for the grand opening of our latest showroom in the heart of Milan\'s design district.',
    image: ''
  },
  {
    id: 2,
    title: 'Sustainable Design Innovation',
    date: 'March 10, 2024',
    excerpt: 'Exploring new sustainable materials and practices in luxury interior design.',
    image: ''
  },
  {
    id: 3,
    title: 'Award-Winning Project',
    date: 'March 5, 2024',
    excerpt: 'D&D Design Center receives international recognition for innovative design solutions.',
    image: ''
  }
];

const News = () => {
  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-12">Latest News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="p-6">
                <p className="text-sm text-[#C5A267] mb-2">{item.date}</p>
                <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <a 
                  href="#" 
                  className="text-[#C5A267] hover:text-[#B49157] transition-colors duration-200"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;