import React from "react";
import { Modal, ModalProps } from "./Modal";

interface ConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  description?: string;
}

const DEFAULT_DESCRIPTION = "Are you sure?";

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onConfirm,
  description = DEFAULT_DESCRIPTION,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps} size="confirm">
      <div className="confirmModal">
        <h2>{description}</h2>

        <div className="controls">
          <button onClick={modalProps.onClose} className="cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm">
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};
