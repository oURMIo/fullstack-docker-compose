import { useState, useEffect, useRef } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { editUser, getUser } from "../api/UserService";
import { toastError, toastSuccess } from "../api/ToastService";

const UserDetals = () => {
  const inputRef = useRef();
  const [user, setUser] = useState({
    firatName: "",
    lastName: "",
    position: "",
    id: "",
    supervisor: "",
    creationDate: "",
  });

  const { id } = useParams();

  const fetchUser = async (id) => {
    try {
      const { data } = await getUser(id);
      setUser(data);
      console.log(data);
      //toastSuccess('User retrieved');
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onUpdateUser = async (event) => {
    event.preventDefault();
    await editUser(user);
    fetchUser(id);
    toastSuccess("User Updated");
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

  return (
    <>
      <Link to={"/users"} className="link">
        <i className="bi bi-arrow-left"></i> Back to list
      </Link>
      <div className="profile">
        <div className="profile__details">
          <div className="profile__metadata">
            <p className="profile__name">{user.firatName}</p>
          </div>
        </div>
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdateUser} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={user.id}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">FirstName</span>
                  <input
                    type="text"
                    value={user.firatName}
                    onChange={onChange}
                    name="firatName"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">LastName</span>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={onChange}
                    name="lastName"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Position</span>
                  <input
                    type="text"
                    value={user.position}
                    onChange={onChange}
                    name="position"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">supervisor</span>
                  <input
                    type="text"
                    value={user.supervisor}
                    onChange={onChange}
                    name="supervisor"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">creationDate</span>
                  <input
                    type="text"
                    value={user.creationDate}
                    onChange={onChange}
                    name="creationDate"
                    required
                  />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetals;
