import React from "react";
import { Modal, Button } from "antd";

interface ConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  sourceCurrency: string;
  sourceAmount: number;
  targetCurrency: string;
  targetAmount: number;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  isSubmitting,
  sourceCurrency,
  sourceAmount,
  targetCurrency,
  targetAmount,
}) => {
  return (
    <Modal
      title="Confirm Exchange"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="no" onClick={onCancel}>
          No
        </Button>,
        <Button
          key="yes"
          type="primary"
          loading={isSubmitting}
          onClick={onConfirm}
        >
          Yes
        </Button>,
      ]}
      centered
    >
      <p>Are you sure to exchange</p>
      <p>from</p>
      <p>
        <strong>
          {sourceCurrency} - {sourceAmount}
        </strong>
      </p>
      <p>to</p>
      <p>
        <strong>
          {targetCurrency} - {targetAmount}
        </strong>
      </p>
    </Modal>
  );
};

export default ConfirmationModal;
