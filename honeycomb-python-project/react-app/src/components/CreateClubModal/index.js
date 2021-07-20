import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateClub from './ClubModal'
import styles from './ClubModal.module.css';


function ClubModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className={styles.club_button} onClick={() => setShowModal(true)}>Create A Club</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateClub />
                </Modal>
            )}
        </>
    );
}

export default ClubModal;
