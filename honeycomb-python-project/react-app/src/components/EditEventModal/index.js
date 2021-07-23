import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditEvent from './EditEventModal'


function EventModal({ eventId}) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className='cta_button_empty' onClick={() => setShowModal(true)}>Edit Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditEvent eventId={eventId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EventModal;
