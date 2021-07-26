import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditClubForm from './EditClubForm'


function EditClubModal({ club }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className='cta_button_coral_empty' onClick={() => setShowModal(true)}>Edit Club</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditClubForm setShowModal={setShowModal} club={club} />
                </Modal>
            )}
        </>
    );
}

export default EditClubModal;
