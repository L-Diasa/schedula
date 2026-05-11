import "./eventPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function EventPage() {
   const participants = [
    "John",
    "Emma",
    "Lucas",
    "Sophia",
    "Liam",
    "Olivia",
    "Ava",
  ];

  return (
    <main className="event-page">
      <div className="event-container">

        {/* Left side */}
        <section className="event-main">

          <button className="back-button">
            ← Go back
          </button>

          <h1 className="event-title">
            Event name
          </h1>

          <p className="event-description">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s. 
          </p>

          <div className="participants-section">

            <h2>Participants</h2>

            <div className="participants-row">
              {participants.slice(0, 7).map((participant, index) => (
                <div className="icon-card" key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hero-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
              ))}
            </div>

            <button className="participants-button">
              See all participants
            </button>

          </div>

          <button className="signup-button">
            Sign up
          </button>

        </section>

        {/* Right side */}
        <aside className="event-sidebar">

          <div className="info-box">
            <div className="icon-card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hero-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>

            <p>
              Friday April 24 2026,
              <br />
              08:00-10:00
            </p>
          </div>

          <div className="info-box">
            <div className="icon-card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hero-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            </div>

            <p>
              Campus SophiaTech,
              <br />
              450 Route des Chappes,
              <br />
              06410 Biot
            </p>
          </div>

          <MapContainer
              center={[43.6156, 7.0718]}
              zoom={15}
              scrollWheelZoom={true}
              className="map-container"
              >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[43.6156, 7.0718]}>
                <Popup>Campus SophiaTech</Popup>
              </Marker>
          </MapContainer>

        </aside>

      </div>
    </main>
  );
}