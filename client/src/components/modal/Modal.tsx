import React, { ReactNode } from 'react';

import './modal.scss';
interface ModalI {
  children: ReactNode;
  onClose: () => void;
  title: string;
}
export const Modal: React.FC<ModalI> = ({ children, onClose, title }) => {
  function close(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('add')) {
      onClose();
    }
  }
  return (
    <div onClick={close} className="add">
      <div className="modal">
        <span className="close" onClick={() => onClose()}>
          X
        </span>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};
