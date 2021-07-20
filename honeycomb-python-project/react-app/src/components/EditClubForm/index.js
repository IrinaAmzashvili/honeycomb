import React, {useEffect, useState} from 'react';
import styles from './EditClub.module.css';

// Club Name
// Club Image URL
// Category
// Description
const EditClubForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [category, setCategory] = useState('');

    return (
        <>
            <div>
                <form>
                    <div className={styles.editHeadingContainer}>
                        <h1 className={styles.editHeading}>Edit Form</h1>
                    </div>
                    <label></label>
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
                </form>
            </div>
        </>
    )
}


export default EditClubForm;
