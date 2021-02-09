import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

interface ButtonProps {
  href?: string;
  size?: number;
  inverse?: boolean;
  danger?: boolean;
  children: React.ReactNode;
  to?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  href,
  size,
  inverse,
  danger,
  children,
  to,
  type,
  onClick,
  disabled
}: ButtonProps) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${inverse &&
          'button--inverse'} ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size || 'default'} ${inverse &&
          'button--inverse'} ${danger && 'button--danger'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || 'default'} ${inverse &&
        'button--inverse'} ${danger && 'button--danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
