import React from "react";
import classes from "./ConfirmModal.module.css"; // Make sure to create and style this CSS file

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={classes.modal_overlay}>
      <div className={classes.modal_content}>
        <p>{message}</p>
        <div className={classes.modal_actions}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
