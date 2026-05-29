import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Navigate,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import data from "./../db.json"
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import { CreateEventModal } from "./components/CreateEventModal/CreateEventModal";
import { Modal } from "./components/Modal/Modal";
import EventPage from "./pages/EventPage/EventPage";

function HomePage2() {
  const navigate = useNavigate();
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModals = () => {
    setCreateEventModalOpen(false);
    setModalOpen(false);
  };

  const handleCreateEvent = (newEvent) => {
    const existingEvents =
      JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = [...existingEvents, newEvent];

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    console.log("Saved to localStorage:", newEvent);

    setCreateEventModalOpen(false);
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
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/home2" element={<HomePage2 />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </>
  );
}

export default App;
