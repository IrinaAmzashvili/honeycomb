import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import styles from './EditClub.module.css';
import { editClub } from '../../store/clubs';
import { useDispatch } from 'react-redux';
// Club Name
// Club Image URL
// Category
// Description
const EditClubForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [category, setCategory] = useState('');
    const {id} = useParams();


    const editForm = (event) => {
        event.preventDefault();

        // const stuff = {
        //     name,
        //     description,
        //     imgUrl,
        //     category,
        // }

        dispatch(editClub(id, {name, description, imgUrl, category}));
        // dispatch(editClub({stuff}));

    }

    return (
        <>
            <div className={styles.editFormContainer}>
                <form onSubmit={editForm} className={styles.editForm}>
                    <div className={styles.editHeadingContainer}>
                        <h1 className={styles.editHeading}>Edit Form</h1>
                    </div>
                    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} type='text' className={styles}/>
                    <input placeholder="Image Url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} className={styles}/>
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} type='text' className={styles}></textarea>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles}>
                        <option value="" disabled>Select a Category</option>
                        <option value={1} >Social</option>
                        <option value={2} >Academic</option>
                        <option value={3} >Political</option>
                        <option value={4} >Theater and Art</option>
                        <option value={5} >Cultural</option>
                        <option value={6} >Sports and Recreation</option>
                        <option value={7} >Religious</option>
                        <option value={8} >Community Service</option>
                        <option value={9} >Media and Publication</option>
                    </select>
                    <button className={styles.submitEditButton}>Edit Club</button>
                </form>
            </div>
        </>
    )
}


export default EditClubForm;
