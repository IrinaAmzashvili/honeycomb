import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUser from './EditUserModal'
import styles from './EditUserModal.module.css';

function UserModal({ setUser }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className='cta_button_coral_empty' onClick={() => setShowModal(true)} >Edit Profile </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditUser setUser={setUser} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default UserModal;
