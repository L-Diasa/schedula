import { useState } from "react";
import { createPortal } from "react-dom";
import { 
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import { CreateEventModal } from "./Components/CreateEventModal/CreateEventModal";
import { Modal } from "./Components/Modal/Modal";
import { createEvent } from "./api/events";
import { useFetch } from "./utils/hooks/useFetch";
import EventPage from "./pages/EventPage";

function HomePage() {
  const navigate = useNavigate();
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

    const {
    data: events,
    isPending,
    error,
  } = useFetch("http://localhost:3000/events");

  const closeModals = () => {
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

  const firstEvent = events?.[0];

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
            onSubmit={handleCreateEvent}
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