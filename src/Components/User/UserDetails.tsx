import React from 'react';
import { Modal, Button } from 'react-bootstrap';



const UserDetails = ({ user, show, onClose }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{user.name || 'Unknown User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Username:</strong> {user.username || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <p><strong>Website:</strong> {user.website || 'N/A'}</p>

        <hr />
        <h5>Address</h5>
        <p>{user.address?.street || 'N/A'}, {user.address?.suite || 'N/A'}</p>
        <p>{user.address?.city || 'N/A'}, {user.address?.zipcode || 'N/A'}</p>
        <p><strong>Geo:</strong> {user.address?.geo?.lat || 'N/A'}, {user.address?.geo?.lng || 'N/A'}</p>

        <hr />
        <h5>Company</h5>
        <p><strong>Name:</strong> {user.company?.name || 'N/A'}</p>
        <p><strong>Catchphrase:</strong> {user.company?.catchPhrase || 'N/A'}</p>
        <p><strong>Business:</strong> {user.company?.bs || 'N/A'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetails;
