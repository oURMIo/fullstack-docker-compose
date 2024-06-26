import React from "react";

const NewUserModal = ({ values, onChange, handleNewUser, pageToggleModal }) => {
  return (
    <dialog className="modal" id="modal" open>
      <div className="modal__header">
        <h3>New User</h3>
        <i onClick={() => pageToggleModal(false)} className="bi bi-x-lg"></i>
      </div>
      <div className="divider"></div>
      <div className="modal__body">
        <form onSubmit={handleNewUser}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">FirstName</span>
              <input
                type="text"
                value={values.firstName}
                onChange={onChange}
                name="firstName"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">LastName</span>
              <input
                type="text"
                value={values.lastName}
                onChange={onChange}
                name="lastName"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Position</span>
              <input
                type="text"
                value={values.position}
                onChange={onChange}
                name="position"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Supervisor</span>
              <input
                type="text"
                value={values.supervisor}
                onChange={onChange}
                name="supervisor"
              />
            </div>
          </div>
          <div className="form_footer">
            <button
              onClick={() => pageToggleModal(false)}
              type="button"
              className="btn btn-danger"
            >
              Cancel
            </button>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default NewUserModal;
