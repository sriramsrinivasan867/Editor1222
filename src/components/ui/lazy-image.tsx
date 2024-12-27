import { useState, useEffect, lazy, Suspense } from 'react';
import { Skeleton } from './skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  if (isLoading) {
    return <Skeleton className={`w-full h-full ${className}`} />;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
      loading="lazy"
    />
  );
}
