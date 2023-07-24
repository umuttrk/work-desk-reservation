import React from 'react';
import "./Modal.css";

const Modal = ({ deskId, onClose }) => {
  // divId değerini kullanarak modal içeriğini ve davranışını ayarlayın
  // onClose fonksiyonunu modalı kapatmak için kullanın
  return (
    <div className="modal">
    <div className="modal-content">
      <h2>{deskId}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        perferendis suscipit officia recusandae, eveniet quaerat assumenda
        id fugit, dignissimos maxime non natus placeat illo iusto!
        Sapiente dolorum id maiores dolores? Illum pariatur possimus
        quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
        placeat tempora vitae enim incidunt porro fuga ea.
      </p>
      <button className="close-modal" onClick={onClose}>
        CLOSE
      </button>
    </div>
  </div>
  );
};

export default Modal;