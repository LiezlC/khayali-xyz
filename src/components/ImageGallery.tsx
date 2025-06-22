// Dynamic image gallery component for showcasing consciousness imagery
'use client';

import { useState, useEffect } from 'react';

interface ImageGalleryProps {
  category: 'cosmic' | 'saraloosa' | 'generated' | 'all';
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
  theme?: 'dark' | 'cosmic' | 'organic';
}

export default function ImageGallery({ 
  category = 'all', 
  columns = 3, 
  showCaptions = true,
  theme = 'dark'
}: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Will dynamically load images based on category
    // For now, using placeholder structure
    const mockImages = [
      '/images/cosmic/placeholder1.jpg',
      '/images/cosmic/placeholder2.jpg', 
      '/images/saraloosa/placeholder3.jpg',
    ];
    
    setImages(mockImages);
    setLoading(false);
  }, [category]);

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', 
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const themeClasses = {
    dark: 'bg-gray-900',
    cosmic: 'bg-gradient-to-br from-purple-900/20 to-blue-900/20',
    organic: 'bg-gradient-to-br from-green-900/20 to-amber-900/20'
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl ${themeClasses[theme]}`}>
      <div className={`grid gap-4 ${gridClasses[columns]}`}>
        {images.map((image, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg bg-gray-800">
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              {/* Placeholder until real images are uploaded */}
              <div className="text-4xl">
                {category === 'cosmic' ? '?' : category === 'saraloosa' ? '?' : '?'}
              </div>
            </div>
            
            {showCaptions && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm text-white">
                  {category === 'cosmic' ? 'Consciousness Visualization' : 
                   category === 'saraloosa' ? 'Farm Life Moment' : 
                   'Creative Expression'} #{index + 1}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Upload your images to see them dynamically integrated here!
        </p>
      </div>
    </div>
  );
}