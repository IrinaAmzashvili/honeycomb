import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateEvent from './EventModal'
import styles from '../../FormModal.module.css'

function EventModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className={styles.club_button} onClick={() => setShowModal(true)}>Create an Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateEvent setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EventModal;
