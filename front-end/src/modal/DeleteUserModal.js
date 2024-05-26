import React from 'react';

const DeleteUserModal = ({ userID, onChange, handleDeleteUser, pageToggleModal }) => {
  return (
    <dialog className="modal" id="modal" open>
      <div className="modal__header">
        <h3>Delete User</h3>
        <i onClick={() => pageToggleModal()} className="bi bi-x-lg"></i>
      </div>
      <div className="divider"></div>
      <div className="modal__body">
        <form onSubmit={handleDeleteUser}>
            <p>Are you sure you want to delete this user?</p>
            <div className="input-box">
                    <span className="details">User ID</span>
                    <input type="text" value={userID} onChange={onChange} name='id' required />
            </div>
            <div className="form_footer">
            <button onClick={() => pageToggleModal()} type="button" className="btn btn-danger">Cancel</button>
            <button onClick={() => handleDeleteUser(userID)} className="btn">Delete</button>
            </div>
        </form>
      </div>
    </dialog>
  );
};

export default DeleteUserModal;
