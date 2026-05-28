import "./EventPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ParticipantsModal } from "../../components/ParticipantsModal/ParticipantsModal";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { useEffect, useState } from "react";

export default function EventPage() {
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [extraParticipants, setExtraParticipants] = useState([]);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  
  const navigate = useNavigate();

  const profileIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="hero-icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const event = events?.[0];

  if (!event) {
    return <p className="loading">No event found.</p>;
  }

  const registeredParticipants =
    event?.participants?.map((participant) => ({
      ...participant,
      icon: profileIcon,
    })) || [];

  const allParticipants = [
    ...registeredParticipants,
    ...extraParticipants,
  ];

  const handleSignUp = () => {
    const newParticipant = {
      name: "John Doe",
      icon: profileIcon,
    };

    setExtraParticipants((prev) => [...prev, newParticipant]);
    setSignedUp(true);
  };

  const handleLeaveEvent = () => {
    setExtraParticipants((prev) =>
      prev.filter((participant) => participant.name !== "John Doe")
    );

    setSignedUp(false);
  };

  const position = [event.latitude, event.longitude];

  return (
    <main className="event-page">
      <div className="event-container">
        <section className="event-main">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Go back
          </button>

          <h1 className="event-title">{event.title}</h1>

          <p className="event-description">{event.description}</p>

          <div className="participants-section">
            <h2>Participants</h2>

            <div className="participants-row">
              {allParticipants.slice(0, 7).map((participant, index) => (
                <div className="icon-card" key={index}>
                  {participant.icon}
                </div>
              ))}
            </div>

            <button
              className="participants-button"
              onClick={() => setShowParticipantsModal(true)}
            >
              See all participants
            </button>
          </div>

          <button
            className="btn signup-button"
            onClick={() =>
              signedUp ? setShowLeaveModal(true) : setShowSignupModal(true)
            }
          >
            {signedUp ? "Leave event" : "Sign up"}
          </button>
        </section>

        <aside className="event-sidebar">
          <div className="info-box">
            <div className="icon-card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="hero-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            <p>
              {event.date}, {event.time}
            </p>
          </div>

          <div className="info-box">
            <div className="icon-card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="hero-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>

            <p>{event.location}</p>
          </div>

          <MapContainer
            key={position.join(",")}
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            className="map-container"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>{event.location}</Popup>
            </Marker>
          </MapContainer>
        </aside>
      </div>

      {showSignupModal && (
        <Modal
          closeModal={() => setShowSignupModal(false)}
          title="Confirm signup"
        >
          <p>Are you sure you want to sign up for this event?</p>

          <div className="modal-footer">
            <button
              className="btn-submit"
              onClick={() => {
                handleSignUp();
                setShowSignupModal(false);
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}

      {showLeaveModal && (
        <Modal
          closeModal={() => setShowLeaveModal(false)}
          title="Confirm leave"
        >
          <p>Are you sure you want to leave this event?</p>

          <div className="modal-footer">
            <button
              className="btn-submit"
              onClick={() => {
                handleLeaveEvent();
                setShowLeaveModal(false);
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}

      {showParticipantsModal && (
        <ParticipantsModal
          participants={allParticipants}
          closeModal={() => setShowParticipantsModal(false)}
        />
      )}
    </main>
  );
}