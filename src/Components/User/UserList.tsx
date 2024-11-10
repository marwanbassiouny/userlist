import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from "../../redux/reducer";
import { Table,Button } from 'react-bootstrap';
import { User,NewUser } from './UserInterface';
import './UserList.css';
import UserDetails from './UserDetails.tsx';
import AddUserForm from './AddUserForm.tsx';

const UserList = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false); 
  let nextId = users.length+1;

  const dispatch = useDispatch();
  const globalState = useSelector((state: any) => state.favorites.favoritesUsers); 
  
  console.log(globalState)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

 
  const handleToggleFavorite = (user: User) => {
    const isFavorite = globalState.some(fav => fav.id === user.id);
     if (isFavorite) {
       dispatch(removeFavorite(user.id)); 
     } else {
       dispatch(addFavorite({ id: user.id, name: user.name })); 
     }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
  
  const handleAddUser = async (newUser: Partial<User>) => {

    const userToAdd: any = {
      ...newUser,
      id: nextId++,
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const createdUser = await response.json();

      createdUser.id = userToAdd.id;

      setUsers(prevUsers => [...prevUsers, createdUser]);
      setShowAddUserModal(false)
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return alert(error.message)

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between p-2 mb-2'>
        <h1>User List</h1>

        <Button variant="primary" onClick={() => setShowAddUserModal(true)} className="">
          Add New User
        </Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th style={{fontSize:"25px",textAlign:"left"}}>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
             const isFavorite = globalState.some((fav: { id: number }) => fav.id === user.id);
            return (
              <tr key={user.id}>
                <td className='d-flex align-items-center justify-content-between'>
                  <span
                    onClick={() => handleUserClick(user)}
                    style={{ cursor: 'pointer', color: 'black',fontSize:"20px", textDecoration: 'none' }}
                  >
                    {user.id} {user.name}
                  </span>
                  <span
                    onClick={() => handleToggleFavorite(user)}
                    className={`favorite-icon ${isFavorite ? 'favorite' : ''}`}
                    style={{cursor: 'pointer' }}
                  >
                    {isFavorite ? '⭐' : '☆'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <AddUserForm
        onAddUser={handleAddUser}
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
      />
      
      <UserDetails user={selectedUser} show={showModal} onClose={handleCloseModal} />
    </div>
  );
}

export default UserList;
