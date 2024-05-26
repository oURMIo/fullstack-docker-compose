import React from 'react'
import '../UserList.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserList = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map(user => (
          <div key={user.id} className="user__header">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.firstName.substring(0, 15)} {user.lastName.substring(0, 15)}</p>
            <p><strong>Position:</strong> {user.position.substring(0, 15)}</p>
            <p><strong>Supervisor:</strong> {user.supervisor.substring(0, 15)}</p>
            <p><strong>Creation Date:</strong> {new Date(user.creationDate).toLocaleString()}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
