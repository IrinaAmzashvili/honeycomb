import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditClubForm from './EditClubForm'
import styles from './EditClub.module.css';


function EditClubModal({ club }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className='cta_button_coral' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditClubForm setShowModal={setShowModal} club={club} />
                </Modal>
            )}
        </>
    );
}

export default EditClubModal;
