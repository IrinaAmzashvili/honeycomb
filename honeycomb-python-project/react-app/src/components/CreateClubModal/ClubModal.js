import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postClub } from "../../store/clubs";
import styles from './ClubModal.module.css';




function CreateClub() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [category, setCategory] = useState(1)


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
                    <input className={styles.club__name} name="name" type="text" placeholder="Club Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>


                <div className={styles.club__label__container}>
                    <label className={styles.club__form__label}>Club Image URL</label>
                </div>
                <div>
                    <input className={styles.club__name} name="imgUrl" type="text" placeholder="Club Img Url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                </div>


                <div className={styles.club__label__container}>
                    <label className={styles.club__form__label}>Category</label>
                </div>
                <div>
                    <input className={styles.club__name} name="category" type="number" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>


                <div className={styles.club__label__container}>
                    <label className={styles.club__form__label}>Description</label>
                </div>
                <div>
                    <textarea className={styles.club__description} name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                
                <div>
                    <button className={styles.submit_button} type="submit">Submit Club</button>
                </div>
            </form>
        </div>

    )

}

export default CreateClub
