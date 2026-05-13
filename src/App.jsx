import { useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import { CreateEventModal } from "./components/CreateEventModal/CreateEventModal";
import { Modal } from "./components/Modal/Modal";
import { createEvent } from "./api/events";

function App() {
  const [CreateEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setCreateEventModalOpen(false);
    setModalOpen(false);
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      const savedEvent = await createEvent(newEvent);

      console.log(savedEvent);

      setCreateEventModalOpen(false);
    } catch (err) {
      console.error(err);
    }
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
              closeModal={() => setCreateEventModalOpen(false)}
              onSubmit={handleCreateEvent}
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
