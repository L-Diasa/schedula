import { useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import { CreateEventModal } from "./components/CreateEventModal/CreateEventModal";
import { Modal } from "./components/Modal/Modal";
import { createEvent } from "./api/events";
import { useFetch } from "./utils/hooks/useFetch";

function App() {
  const [CreateEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  const {
    data: events,
    isPending,
    error,
  } = useFetch("http://localhost:3000/events");

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

  const firstEvent = events?.[0];

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
      <section className="events-section">
        <h2>First Event</h2>

        {isPending && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {firstEvent && (
          <div className="event-card">
            <p>
              <strong>Title:</strong> {firstEvent.title}
            </p>

            <p>
              <strong>Group:</strong> {firstEvent.group}
            </p>

            <p>
              <strong>Date:</strong> {firstEvent.date}
            </p>

            <p>
              <strong>Time:</strong> {firstEvent.time}
            </p>

            <p>
              <strong>Location:</strong> {firstEvent.location}
            </p>

            <p>
              <strong>Description:</strong> {firstEvent.description}
            </p>

            <p>
              <strong>ID:</strong> {firstEvent.id}
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
