import { Modal } from '../Modal/Modal';

export function CreateEventModal({ closeModal, onSubmit, children }) {
  return (
    <Modal closeModal={closeModal} onSubmit={onSubmit}>
      <h1 className="modal-title">Create new event</h1>
      {children}
    </Modal>
  );
}