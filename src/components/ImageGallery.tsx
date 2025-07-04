// Dynamic image gallery component for showcasing consciousness imagery
'use client';

import { useState, useEffect } from 'react';
import { getAllCosmicImages, getImagesForGallery } from '@/utils/imageManager';
import Image from 'next/image';

interface ImageGalleryProps {
  category: 'cosmic' | 'saraloosa' | 'generated' | 'all';
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
  theme?: 'dark' | 'cosmic' | 'organic';
  maxImages?: number;
}

export default function ImageGallery({ 
  category = 'all', 
  columns = 3, 
  showCaptions = true,
  theme = 'dark',
  maxImages = 12
}: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load your actual uploaded images
    let imageList: string[] = [];
    
    if (category === 'cosmic' || category === 'all') {
      imageList = getAllCosmicImages();
    }
    
    // Limit to maxImages
    if (maxImages && imageList.length > maxImages) {
      imageList = imageList.slice(0, maxImages);
    }
    
    setImages(imageList);
    setLoading(false);
  }, [category, maxImages]);

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
        {images.map((imageSrc, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg bg-gray-800 hover:scale-105 transition-transform duration-300">
            <div className="aspect-square relative">
              <Image
                src={imageSrc}
                alt={`Consciousness visualization ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            {showCaptions && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm text-white">
                  Cosmic Consciousness #{index + 1}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No images found for this category yet.</p>
        </div>
      )}
    </div>
  );
}``