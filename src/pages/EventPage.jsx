import { useState } from "react";
import "./eventPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ParticipantsModal } from "../components/ParticipantsModal/ParticipantsModal";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils/hooks/useFetch";

export default function EventPage() {
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);

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

  const navigate = useNavigate();

  const {
  data: events,
  isPending,
  error,
  } = useFetch("http://localhost:3000/events");

  const event = events?.[0];

  const participants =
  event?.participants?.map((participant) => ({
    ...participant,
    icon: profileIcon,
  })) || [];

  const position = [
  event?.latitude,
  event?.longitude,
  ];

  if (isPending) {
  return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="event-page">
      <div className="event-container">
        <section className="event-main">
          <button
            className="back-button"
            onClick={() => navigate(-1)}>
            ← Go back
          </button>

          <h1 className="event-title"> {event?.title} </h1>

          <p className="event-description"> {event?.description} </p>

          <div className="participants-section">
            <h2>Participants</h2>

            <div className="participants-row">
              {participants.slice(0, 7).map((participant, index) => (
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

          <button className="signup-button">Sign up</button>
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
              {event?.date}, {event?.time}
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

            <p>
              {event?.location}
            </p>
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
              <Popup>{event?.location}</Popup>
            </Marker>
          </MapContainer>
        </aside>
      </div>

      {showParticipantsModal && (
        <ParticipantsModal
          participants={participants}
          closeModal={() => setShowParticipantsModal(false)}
        />
      )}
    </main>
  );
}