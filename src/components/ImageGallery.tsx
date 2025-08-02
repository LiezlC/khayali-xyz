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
      <div className={`min-h-screen ${themeClasses[theme]} flex items-center justify-center`}>
        <div className="text-white">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses[theme]} p-8`}>
      <div className={`grid ${gridClasses[columns]} gap-6`}>
        {images.map((imageSrc, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={imageSrc}
                alt={`Cosmic Consciousness ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {showCaptions && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                Cosmic Consciousness #{index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="text-center text-white/70 py-12">
          No images found for this category yet.
        </div>
      )}
    </div>
  );
}