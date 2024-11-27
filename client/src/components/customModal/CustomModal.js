import React from "react";
import "./CustomModal.css";

const CustomModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // 모달이 열려 있지 않으면 렌더링하지 않음

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <p>{message}</p>
        <button className="custom-modal-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
