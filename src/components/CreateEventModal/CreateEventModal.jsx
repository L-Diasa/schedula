import "./CreateEventModal.css";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";

export function CreateEventModal({ closeModal, onSubmit }) {
  const [groups, setGroups] = useState(() => { return JSON.parse(localStorage.getItem("groups")) || []; });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const location = formData.get("location");

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`
  );

  const locationData = await response.json();

  if (locationData.length === 0) {
    alert("Location not found. Please enter a more specific address.");
    return;
  }

  const newEvent = {
    title: formData.get("title"),
    group: formData.get("group"),
    date: formData.get("date"),
    time: formData.get("time"),
    location,
    description: formData.get("description"),
    latitude: Number(locationData[0].lat),
    longitude: Number(locationData[0].lon),
    participants: [],
  };

  console.log("locationData:", locationData);
  console.log("newEvent:", newEvent);
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
            placeholder="Street or place, City, Country"
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
