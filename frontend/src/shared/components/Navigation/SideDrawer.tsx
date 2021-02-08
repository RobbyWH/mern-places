import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.css';

interface NavLinksProps {
  children: React.ReactNode;
  show: boolean;
  onClick(): void;
};

const SideDrawer = ({children, show = false, onClick}: NavLinksProps) => {
  const content =  (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={200}
      classNames="slide-in-left"
    >
        <aside
          className="side-drawer"
          onClick={onClick}
        >
          {children}
        </aside>
    </CSSTransition>
  );
  const drawerHook = document.getElementById('drawer-hook');
  return drawerHook ? ReactDOM.createPortal(content, drawerHook) : null;
}

export default SideDrawer;