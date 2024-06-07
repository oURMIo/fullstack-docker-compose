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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>User ID</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Position</strong>
            </TableCell>
            <TableCell>
              <strong>Supervisor</strong>
            </TableCell>
            <TableCell>
              <strong>Creation Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.firstName.substring(0, 15)}{" "}
                {user.lastName.substring(0, 15)}
              </TableCell>
              <TableCell>{user.position.substring(0, 15)}</TableCell>
              <TableCell>{user.supervisor.substring(0, 15)}</TableCell>
              <TableCell>
                {new Date(user.creationDate).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
