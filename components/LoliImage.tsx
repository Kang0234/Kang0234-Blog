'use client';
import { useState } from 'react';
import { getLoliImage, LOLI_SOURCE_COUNT } from '@/lib/loli-image';

interface LoliImageProps {
  seed: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function LoliImage({ seed, alt, className = '', width, height }: LoliImageProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const src = getLoliImage(seed, sourceIndex);

  const handleError = () => {
    if (sourceIndex < LOLI_SOURCE_COUNT) {
      setSourceIndex(sourceIndex + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-400 text-sm">图片加载失败</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!loaded && <div className="absolute inset-0 img-skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
}
