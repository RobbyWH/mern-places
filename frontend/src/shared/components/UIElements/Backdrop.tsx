import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

interface BackdropProps {
  onClick?: () => void;
};

const Backdrop = ({onClick}: BackdropProps) => {
  const backdropHook = document.getElementById('backdrop-hook');
  return backdropHook ?
    ReactDOM.createPortal(
      <div
        className="backdrop"
        onClick={onClick}></div>,
        backdropHook
    ) : null;
};

export default Backdrop;