import React, { useState } from 'react';
import { NewUser,User } from './UserInterface';
import { Modal, Button, Form } from 'react-bootstrap';



const AddUserForm = ({ onAddUser, show, onHide }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const newUser: any = { name, email, phone };
    onAddUser(newUser);

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className='p-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className='p-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className='p-2'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 w-100">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserForm;
