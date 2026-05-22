import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";

import EventPage from "./pages/EventPage";
import { CreateEventModal } from "./components/CreateEventModal/CreateEventModal";
import { Modal } from "./components/Modal/Modal";

function HomePage() {
  const navigate = useNavigate();

  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModals = () => {
    setCreateEventModalOpen(false);
    setModalOpen(false);
  };

  return (
    <div className="App">
      <button
        className="btn btn-open"
        onClick={() => setCreateEventModalOpen(true)}
      >
        Open Create Event Modal
      </button>

      <button
        className="btn btn-open"
        onClick={() => setModalOpen(true)}
      >
        Open Simple Modal
      </button>

      <button
        className="btn btn-open"
        onClick={() => navigate("/event")}
      >
        Go to Event Page
      </button>

      {createEventModalOpen &&
        createPortal(
          <CreateEventModal
            closeModal={closeModals}
            onSubmit={closeModals}
          />,
          document.body
        )}

      {modalOpen &&
        createPortal(
          <Modal closeModal={closeModals} title="Simple Modal">
            <p>This is the content of the modal.</p>
          </Modal>,
          document.body
        )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event" element={<EventPage />} />
    </Routes>
  );
}

export default App;