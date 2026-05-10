import "./Modal.css";

export function Modal({ closeModal, onSubmit, children }) {
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
        <div className="modal-footer">
          <button
            type="submit"
            className="btn-submit"
            onClick={() => onSubmit("Submit button was clicked")}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
