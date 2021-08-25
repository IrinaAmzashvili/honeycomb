import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUser from './EditUserModal'
import styles from './EditUserModal.module.css';

function UserModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className={styles.profileEditButton} onClick={() => setShowModal(true)} >Edit Profile </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditUser setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default UserModal;
