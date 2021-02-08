import React from 'react';

import './Avatar.css';

interface AvatarInterface {
  className?: string;
  style?: React.CSSProperties;
  image: string;
  width?: number;
  height?: number;
  alt: string;
};

const Avatar = ({
  className,
  style,
  image,
  width,
  height,
  alt
}: AvatarInterface) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width, height }}
      />
    </div>
  );
};

export default Avatar;
