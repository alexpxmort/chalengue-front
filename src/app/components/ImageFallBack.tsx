
import React, { CSSProperties, useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc: string; 
  style?:CSSProperties
}

const ImageWithFallback = ({ src, alt, width, height, fallbackSrc,style }:ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc); 
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      data-testid="image"
      width={width}
      height={height}
      onError={handleError} 
      objectFit="cover"
      style={style}
    />
  );
};

export default ImageWithFallback;
