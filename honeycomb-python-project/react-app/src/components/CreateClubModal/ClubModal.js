import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postClub } from "../../store/clubs";
import styles from './ClubModal.module.css';


function CreateClub() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [category, setCategory] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClub = {
            name,
            description,
            img_url: imgUrl,
            category_id: category,

        }
        await dispatch(postClub(newClub))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.club__heading_container}>
                    <h1 className={styles.club__form__heading}>Create A Club</h1>
                </div>
                <div className={styles.club__label__container}>
                    <label className={styles.club__form__label}>Club Name</label>
                </div>
                <div>
                    <input className={styles.club__name} name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>


                <div className={styles.club__label__container}>
                    <label className={styles.club__form__label}>Club Image URL</label>
                </div>
                <div>
                    <input className={styles.club__name} name="imgUrl" type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                </div>


                <div className={styles.club__label__container}>
                    <label className={styles.club__form__label}>Category</label>
                </div>
                <div>
                    <select className={styles.club__name} value={category} onChange={(e) => setCategory(e.target.value)}>
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
                </div>


                <div className={styles.club__label__container}>
                    <label className={styles.club__form__label}>Description</label>
                </div>
                <div>
                    <textarea className={styles.club__description} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>


                <div>
                    <button className={styles.submit_button} type="submit">Submit Club</button>
                </div>
            </form>
        </div>

    )

}

export default CreateClub
