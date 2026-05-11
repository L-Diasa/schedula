import "./eventPage.css";

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
                <div className="participant-avatar" key={index}>
                  👤
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
            <div className="icon-box">🕒</div>

            <p>
              Friday April 24 2026,
              <br />
              08:00-10:00
            </p>
          </div>

          <div className="info-box">
            <div className="icon-box">📍</div>

            <p>
              Campus SophiaTech,
              <br />
              450 Route des Chappes,
              <br />
              06410 Biot
            </p>
          </div>

          <div className="map-placeholder">
            MAP
          </div>

        </aside>

      </div>
    </main>
  );
}