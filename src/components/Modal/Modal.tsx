import React from "react";
import "./modal.scss";

type Sizes = "small" | "medium" | "large";

interface ModalProps {
  onClose: () => void;
  title?: string;
  size?: Sizes;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  size = "small",
  children,
}) => {
  const modalClasses = `modal modal-${size}`;

  return (
    <>
      <div className="modal-mask" />
      <div className={modalClasses}>
        {title && <h1 className="title">{title}</h1>}
        <span className="close-icon" onClick={onClose}>
          +
        </span>
        {children}
      </div>
    </>
  );
};
