import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './EditClub.module.css';
import { editClub, getSingleClub } from '../../store/clubs';
import { useDispatch, useSelector} from 'react-redux';

const EditClubForm = ({clubId, club}) => {
    // const club = useSelector((state) => state.clubs.singleClub);
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState(club.name);
    const [description, setDescription] = useState(club.description);
    const [imgUrl, setImgUrl] = useState(club.img_url);
    const [category, setCategory] = useState(club.category_id);
    const [clubby, setClubby] = useState(club);
    const {id} = useParams();


        const editForm = (event) => {
            event.preventDefault();

            const editedFormInfo = {
                name,
                description,
                img_url: imgUrl,
                category_id: category
            }
            dispatch(editClub(clubId, editedFormInfo));
        }

        useEffect(() => {
            dispatch(getSingleClub(+id))
            return () => {

            }
        }, [dispatch, club])

    return (
        <>
            <div className={styles.editFormContainer}>
                <form onSubmit={editForm} className={styles.editForm}>
                    <div className={styles.editHeadingContainer}>
                        <h1 className={styles.editHeading}>Edit Form</h1>
                    </div>
                    <input name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} type='text' className={styles}/>
                    <input name="img_url" placeholder="Image Url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} className={styles}/>
                    <textarea name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} type='text' className={styles}></textarea>
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} className={styles}>
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
