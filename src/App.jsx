import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import data from "./../db.json"
import "./App.css";

import { CreateEventModal } from "./components/CreateEventModal/CreateEventModal";
import { Modal } from "./components/Modal/Modal";
import { createEvent } from "./api/events";
import EventPage from "./pages/EventPage/EventPage";

function HomePage2() {
  const navigate = useNavigate();
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    const existingUsers = localStorage.getItem("users");
    const existingEvents = localStorage.getItem("events");
    const existingGroups = localStorage.getItem("groups");

    if (!existingUsers) {
      localStorage.setItem("users", JSON.stringify(data.users));
    }

    if (!existingEvents) {
      localStorage.setItem("events", JSON.stringify(data.events));
    }

    if (!existingGroups) {
      localStorage.setItem("groups", JSON.stringify(data.groups));
    }
  }, []);

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/home2" element={<HomePage2 />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
