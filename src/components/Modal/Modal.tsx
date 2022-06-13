import React from "react";
import "./modal.scss";
import { Loader } from "../Loader/Loader";

type Sizes = "confirm" | "small" | "medium" | "large";

export interface ModalProps {
  onClose: () => void;
  isLoading?: boolean;
  title?: string;
  size?: Sizes;
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  title,
  isLoading,
  size = "small",
  children,
}) => {
  const modalClasses = `modal modal-${size}`;

  return (
    <>
      <div className="modal-mask" />
      <div className={modalClasses}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {title && <h1 className="title">{title}</h1>}
            <span className="close-icon" onClick={onClose}>
              +
            </span>
            {children}
          </>
        )}
      </div>
    </>
  );
};
