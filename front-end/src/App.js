import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { saveUser, editUser, deleteUser } from "./api/UserService";
import Header from "./components/Header";
import UserList from "./components/UserList";
import NewUserModal from "./modal/NewUserModal";
import DeleteUserModal from "./modal/DeleteUserModal";
import EditUserModal from "./modal/EditUserModal";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAddUserOpen, setModalAddUserOpen] = useState(false);
  const [modalDeleteUserOpen, setModalDeleteUserOpen] = useState(false);
  const [modalEditUserOpen, setModalEditUserOpen] = useState(false);
  const [addUserValues, setAddUserValues] = useState({
    firstName: "",
    lastName: "",
    position: "",
    supervisor: "",
  });
  const [editUserValues, setEditUserValues] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    position: "",
    supervisor: "",
  });
  const [deleteUserValums, setDeleteUserValums] = useState({
    id: 0,
  });

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost/users");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      await saveUser(addUserValues);
      setModalAddUserOpen(false);
      setAddUserValues({
        firstName: "",
        lastName: "",
        position: "",
        supervisor: "",
      });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(deleteUserValums);
      setModalDeleteUserOpen(false);
      setDeleteUserValums({
        id: 0,
      });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    try {
      await editUser(editUserValues);
      setModalEditUserOpen(false);
      setEditUserValues({
        id: 0,
        firstName: "",
        lastName: "",
        position: "",
        supervisor: "",
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
        toggleModal={() => setModalAddUserOpen(true)}
        deleteUser={() => setModalDeleteUserOpen(true)}
        editUser={() => setModalEditUserOpen(true)}
      />
      <main className="main">
        <div className="container">
          <UserList users={users} />
        </div>
      </main>

      <div className="App">
        <div className="add__user">
          {modalAddUserOpen && (
            <NewUserModal
              values={addUserValues}
              onChange={(e) =>
                setAddUserValues({
                  ...addUserValues,
                  [e.target.name]: e.target.value,
                })
              }
              handleNewUser={handleAddUser}
              pageToggleModal={(isOpen) => setModalAddUserOpen(isOpen)}
            />
          )}
        </div>
        <div className="delete__user">
          {modalDeleteUserOpen && (
            <DeleteUserModal
              values={deleteUserValums}
              onChange={(e) => setDeleteUserValums(e.target.value)}
              handleDeleteUser={handleDeleteUser}
              pageToggleModal={(isOpen) => setModalDeleteUserOpen(isOpen)}
            />
          )}
        </div>
        <div className="edit__user">
          {modalEditUserOpen && (
            <EditUserModal
              values={editUserValues}
              onChange={(e) =>
                setEditUserValues({
                  ...editUserValues,
                  [e.target.name]: e.target.value,
                })
              }
              handleEditUser={handleEditUser}
              pageToggleModal={(isOpen) => setModalEditUserOpen(isOpen)}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
