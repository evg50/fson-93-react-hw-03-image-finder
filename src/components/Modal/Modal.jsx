import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <img src={imageUrl} alt="full-size" className={styles.modalImage} />
      </div>
    </div>
  );
}
