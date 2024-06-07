import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { saveUser, editUser, deleteUser } from "./api/UserService";
import Header from "./components/Header";
import UserList from "./components/UserList";
import NewUserModal from "./modal/NewUserModal";
import DeleteUserModal from "./modal/DeleteUserModal";
import EditUserModal from "./modal/EditUserModal";
import Config from "./config/Config";

function App() {
  const backendUrl = `http://${Config.host}:${Config.port}`;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAddUserOpen, setModalAddUserOpen] = useState(false);
  const [modalDeleteUserOpen, setModalDeleteUserOpen] = useState(false);
  const [modalEditUserOpen, setModalEditUserOpen] = useState(false);
  const [userValues, setUserValues] = useState({
    firstName: "",
    lastName: "",
    position: "",
    supervisor: "",
  });
  const [userId, setUserId] = useState(0);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user`);
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
      await saveUser(userValues);
      setModalAddUserOpen(false);
      setUserValues({
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
      await deleteUser(userId);
      setModalDeleteUserOpen(false);
      setUserId(0);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    try {
      await editUser(userId, userValues);
      setModalEditUserOpen(false);
      setUserId(0);
      setUserValues({
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
              values={userValues}
              onChange={(e) =>
                setUserValues({
                  ...userValues,
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
              values={userId}
              onChange={(e) => setUserId(e.target.value)}
              handleDeleteUser={handleDeleteUser}
              pageToggleModal={(isOpen) => setModalDeleteUserOpen(isOpen)}
            />
          )}
        </div>
        <div className="edit__user">
          {modalEditUserOpen && (
            <EditUserModal
              userID={userId}
              values={userValues}
              onChange={(e) => {
                const { name, value } = e.target;
                if (name === "id") {
                  setUserId(e.target.value);
                }
                setUserValues({
                  ...userValues,
                  [name]: value,
                });
              }}
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
