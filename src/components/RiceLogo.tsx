import React from 'react';

// Import SVG files
import jasmineSvg from '../assets/jasmine.svg';
import basmatiSvg from '../assets/basmati.svg';
import arborioSvg from '../assets/arborio.svg';
import shortSvg from '../assets/short.svg';
import brownSvg from '../assets/brown.svg';
import sushiSvg from '../assets/sushi.svg';

interface RiceLogoProps {
  type: string;
  size?: 'small' | 'medium' | 'large';
}

const RiceLogo: React.FC<RiceLogoProps> = ({ type, size = 'medium' }) => {
  const getLogoSrc = () => {
    switch (type.toLowerCase()) {
      case 'jasmine':
        return jasmineSvg;
      case 'basmati':
        return basmatiSvg;
      case 'arborio':
        return arborioSvg;
      case 'short_grain':
      case 'short':
        return shortSvg;
      case 'brown':
        return brownSvg;
      case 'sushi':
      case 'wild':
        return sushiSvg;
      default:
        return jasmineSvg; // default fallback
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <img 
      src={getLogoSrc()} 
      alt={`${type} rice logo`}
      className={`${getSizeClass()} object-contain`}
    />
  );
};

export default RiceLogo;
