import React from 'react';
import './Card.css';

interface CardProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Card = ({className, style, children}: CardProps) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
