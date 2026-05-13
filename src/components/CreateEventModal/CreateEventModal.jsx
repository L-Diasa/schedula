import "./CreateEventModal.css";
import { Modal } from "../Modal/Modal";
import { useFetch } from "../../utils/hooks/useFetch";

export function CreateEventModal({ closeModal, onSubmit }) {
  const { data: groups } = useFetch("http://localhost:3000/groups");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newEvent = {
      title: formData.get("title"),
      group: formData.get("group"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      description: formData.get("description"),
    };

    onSubmit(newEvent);
  };

  return (
    <Modal closeModal={closeModal}>
      <h1 className="modal-title">Create new event</h1>

      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event title</label>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Birthday party"
          />
        </div>

        <div className="form-group">
          <label htmlFor="group">Group</label>
          <select name="group" id="group">
            <option value="">Select a group</option>
            {groups &&
              groups.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.label}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input name="date" id="date" type="date" />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input name="time" id="time" type="time" />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            name="location"
            id="location"
            type="text"
            placeholder="EURECOM"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="A short description of the event"
          />
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
