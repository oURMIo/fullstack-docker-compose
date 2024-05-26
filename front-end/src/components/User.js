import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return (
      <Link to={`/user?id=${user.id}`} className="user__item">
              <div className="user__header">
                  <div className="user__details">
                      <p className="user__firstname">{user.firstName.substring(0, 15)}</p>
                      <p className="user__lastname">{user.lastName.substring(0, 15)}</p>
                      <p className="user__position">{user.position}</p>
                  </div>
              </div>
              <div className="user__body">
                  <p><i className="bi bi-id"></i> {user.id}</p>
                  <p><i className="bi bi-supervisor"></i> {user.supervisor} </p>
                  <p><i className="bi bi-create-data"></i> {user.creationDate.toISOString().substring(0, 10)} </p>
              </div>
          </Link>
  )
}

export default User