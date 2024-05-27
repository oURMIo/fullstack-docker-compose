import React from "react";

const Header = ({ toggleModal, deleteUser, editUser }) => {
  return (
    <header className="header">
      <div className="container">
        <button onClick={() => toggleModal(true)} className="btn">
          <i className="bi bi-plus"></i> Add User
        </button>
        <button onClick={() => deleteUser(true)} className="btn">
          <i className="bi bi-trash"></i> Delete User
        </button>
        <button onClick={() => editUser(true)} className="btn">
          <i className="bi bi-pencil"></i> Edit User
        </button>
      </div>
    </header>
  );
};

export default Header;
