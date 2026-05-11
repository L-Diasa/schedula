import "./CreateEventModal.css";
import { Modal } from '../Modal/Modal';

export function CreateEventModal({ closeModal, onSubmit }) {
  return (
    <Modal closeModal={closeModal} onSubmit={onSubmit}>
      <h1 className="modal-title">Create new event</h1>

      <form className="event-form">
        <div className="form-group">
          <label htmlFor="title">Event title</label>
          <input
            id="title"
            type="text"
            placeholder="Birthday party"
          />
        </div>

        <div className="form-group">
          <label htmlFor="group">Group</label>
          <select id="group">
            <option value="">Select a group</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
            <option value="work">Work</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input id="time" type="time" />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="EURECOM"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="A short description of the event"
          />
        </div>

      </form>
    </Modal>
  );
}