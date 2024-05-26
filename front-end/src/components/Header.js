import React from 'react'

const Header = ({ toggleModal, deleteUser, editUser }) => {
    return (
        <header className='header'>
            <div className='container'>
                <button onClick={() => toggleModal(true)} className='btn'>
                    <i className='bi bi-plus-new'></i> Add New User
                </button>
                <button onClick={deleteUser} className='btn'>
                    <i className='bi bi-trash'></i> Delete User
                </button>
                <button onClick={editUser} className='btn'>
                    <i className='bi bi-pencil'></i> Edit User
                </button>
            </div>
        </header>
    );
}

export default Header;
  