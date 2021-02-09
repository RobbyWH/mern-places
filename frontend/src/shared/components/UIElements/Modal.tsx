import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';
import './Modal.css';

interface ModalOverlayProps {
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  header?: string;
  onSubmit?: () => void;
  contentClass?: string;
  children: React.ReactNode;
  footerClass?: string;
  footer?: React.ReactNode;
}

interface ModalProps extends ModalOverlayProps {
  show?: boolean;
  onCancel?: () => void;
  children: React.ReactNode;
}

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}: ModalOverlayProps) => {
  const content = (
    <div style={style} className={`modal ${className}`}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : event => event.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );
  const modalHook = document.getElementById('modal-hook');
  return modalHook ? ReactDOM.createPortal(content, modalHook) : null;
};

const Modal = ({show, onCancel, children, ...rest}: ModalProps) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...rest}>
          {children}
        </ModalOverlay>
      </CSSTransition>
    </>
  )
};

export default Modal;