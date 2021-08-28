import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSchools } from '../../store/schools'
import Select from 'react-select';
import styles from './EditUserModal.module.css';
import { putUser, deleteUser } from '../../store/session'


const EditUser = ({ setShowModal, setUser }) => {
    const history = useHistory();
    const schools = useSelector(state => Object.values(state.school))
    const user = useSelector(state => state.session.user)
    const usersSchool = schools.filter((school) => school.id === user.school_id)[0]
    const dispatch = useDispatch()


    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [userSchool, setUserSchool] = useState(user.school_id);
    const [image, setImage] = useState(null);


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    useEffect(() => {
        dispatch(getAllSchools());
    }, [dispatch]);


    const schoolNames = () => {
        let list = []
        for (const school of schools) {
            let obj = {}
            obj["label"] = school?.name
            obj["value"] = school?.id
            list.push(obj)
        }
        return list

    }

    const startingSchool = () => {

        let obj = {}
        obj["label"] = usersSchool?.name
        obj["value"] = usersSchool?.id


        return obj
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let school_id;
        if (userSchool?.value) {
            school_id = userSchool?.value
        } else {
            school_id = userSchool
        }

        let profile_img_url;
        if (!image) {
          profile_img_url = user.profile_img_url;
        } else {
          profile_img_url = image;
        }

        const form_data = new FormData();
        const editedUser = {
            username,
            email,
            profile_img_url,
            school_id
        }
        for (let key in editedUser) {
            form_data.append(key, editedUser[key]);
        }

        const data = await dispatch(putUser(form_data))
        if (data.errors) {
            setErrors(data.errors);
            return
        }
        setUser(data)
        setShowModal(false);
    }


    const handleDelete = async (e) => {
        e.preventDefault()
        const res =await dispatch(deleteUser())
        if (res["message"]) {
            history.push("/");
        }else{
            setErrors("Something went wrong, please try again")
        }
    }


    if (user.username === "Demo") {
        return (
            <div className={styles.user__heading_container}>
                <h2 className={styles.user__form__heading}>Demo can not be edited</h2>
            </div>
        )
    }
    return (
        <div className={styles.user_form_div}>
            <form onSubmit={handleSubmit} className={styles.user_form}>
                <div className={styles.user__heading_container}>
                    <h1 className={styles.user__form__heading}>Edit User</h1>
                </div>
                <ul className={styles.errors__container}>
                    {errors.map((error, i) => (
                        <li className={styles.errors} key={i}>
                            {error}
                        </li>
                    ))}
                </ul>
                <div className={styles.signup__username__container}>
                    <label htmlFor='username'>
                        <input id='username' placeholder="Username" className={styles.signup__username} type='text' name='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                    </label>
                </div>
                <div className={styles.signup__email__container}>
                    <label htmlFor='signupEmail'>
                        <input id='signupEmail' placeholder="Email" className={styles.signup__email} type='text' name='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </label>
                </div>
                <div className={styles.signup__school}>
                    <label htmlFor='schoolSelect'>
                        <Select
                            id='schoolSelect'
                            defaultValue={startingSchool()}
                            className={styles.signup__selection}
                            placeholder="Select School"
                            options={schoolNames()}
                            onChange={setUserSchool}
                        />
                    </label>
                </div>
                <div className={styles.signup__image__container}>
                    <label htmlFor='signupImgUrl'>
                        <p className={styles.profileImageLabel}>Profile Image:</p>
                        <input id='signupImgUrl' placeholder="Profile Image Url" className={styles.signup__imgUrl} type='file' name='profile_img_url' accept="image/*" onChange={updateImage} />
                    </label>
                </div>
                <div className={styles.button__div}>
                    <button className={`cta_button ${styles.signup__submit}`} type='submit'>Save</button>
                    <button
                        className={`${styles.deleteButton} cta_button_danger`}
                        onClick={handleDelete}
                    >
                        Delete Account
                    </button>
                </div>
            </form>

        </div>

    )
}

export default EditUser
