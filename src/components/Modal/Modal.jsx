import "./Modal.css";

export function Modal({ closeModal, title, children, className = "" }) {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className={`modal ${className}`}>
        <div className="modal-header">
          <button
            className="close"
            onClick={() => closeModal()}
          >
            &times;
          </button>
        </div>

        <div className="modal-content">
          <h1 className="modal-title">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}