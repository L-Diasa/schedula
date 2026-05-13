import { useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import { CreateEventModal } from "./components/CreateEventModal/CreateEventModal";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [CreateEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setCreateEventModalOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <div className="App">
        <button className="btn btn-open" onClick={() => setCreateEventModalOpen(true)}>
          Open Create Event Modal
        </button>
        {CreateEventModalOpen &&
          createPortal(
            <CreateEventModal
              closeModal={handleButtonClick}
              onSubmit={handleButtonClick}
            />,
            document.body,
          )}
        <button className="btn btn-open" onClick={() => setModalOpen(true)}>
          Open Simple Modal
        </button>
        {ModalOpen &&
          createPortal(
            <Modal closeModal={handleButtonClick} title={"Simple Modal"}>
              <p>This is the content of the modal.</p>
            </Modal>,
            document.body,
          )}
      </div>
    </>
  );
}

export default App;
