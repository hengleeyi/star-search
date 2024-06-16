import React from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ show, title, children, onClose }: ModalProps) => {
  if (!show) return null;
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-wrapper">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="font-bold text-2xl">{title}</h3>
            <button className="close-btn" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
