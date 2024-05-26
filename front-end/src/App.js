import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { getUsers, saveUser, editUser } from './api/UserService';
import Header from './components/Header';
import UserList from './components/UserList';
import NewUserModal from './modal/NewUserModal';

function App() {
  const modalRef = useRef();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    position: '',
    supervisor: '',
    creationDate: '',
  });

  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost/users');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewUser = async (event) => {
    event.preventDefault();
    try {
      await saveUser(values);
      setModalOpen(false);
      setValues({
        firstName: '',
        lastName: '',
        position: '',
        supervisor: '',
        creationDate: '',
      });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Backend isn't working</div>;

  return (
    <>
      <Header 
        toggleModal={() => setModalOpen(true)}
      />
      <main className='main'>
        <div className='container'>
          <UserList users={users} />
        </div>
      </main>

      <div className="App">
        {modalOpen && (
          <NewUserModal
            values={values}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            handleNewUser={handleNewUser}
            pageToggleModal={(isOpen) => setModalOpen(isOpen)}
          />
        )}
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
