import { Modal } from "../Modal/Modal";
import "./ParticipantsModal.css";

export function ParticipantsModal({ closeModal, participants = [] }) {
  return (
    <Modal
      closeModal={closeModal}
      title="Participants"
      className="participants-modal"
    >
      <div className="participants-list">
        {participants.map((participant, index) => (
          <div className="participant-row" key={index}>
            <div className="icon-card">{participant.icon}</div>

            <p>{participant.name}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}