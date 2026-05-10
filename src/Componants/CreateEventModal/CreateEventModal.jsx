import "./CreateEventModal.css";

export function CreateEventModal({ closeModal, children }) {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container")
          closeModal("Modal was closed");
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <button
            className="close"
            onClick={() => closeModal("Modal was closed")}
          >
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
