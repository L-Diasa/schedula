import { useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import { CreateEventModal } from "./componants/CreateEventModal/CreateEventModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="App">
        <button className="btn btn-open" onClick={() => setModalOpen(true)}>
          Open
        </button>
        {modalOpen &&
          createPortal(
            <CreateEventModal
              closeModal={handleButtonClick}
              onSubmit={handleButtonClick}
            />,
            document.body,
          )}
      </div>
      <section>
      </section>
    </>
  );
}

export default App;
