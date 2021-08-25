import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSchools } from '../../store/schools'
import Select from 'react-select';
import styles from './EditUserModal.module.css';






const EditUser = ({ setShowModal }) => {
    const schools = useSelector(state => Object.values(state.school))
    const user = useSelector(state => state.session.user)
    const usersSchool = schools.filter((school) => school.id === user.school_id)[0]
    console.log(usersSchool)
    const dispatch = useDispatch()


    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [userSchool, setUserSchool] = useState(usersSchool.name);
    const [profile_img_url, setProfile_img_url] = useState(user.profile_img_url);

    useEffect(() => {
        dispatch(getAllSchools());
    }, [dispatch]);


    const schoolNames = () => {
        let list = []
        for (const school of schools) {
            let obj = {}
            obj["label"] = school.name
            obj["value"] = school.id
            list.push(obj)
        }
        return list

    }

    const startingSchool = () => {

        let obj = {}
        obj["label"] = usersSchool.name
        obj["value"] = usersSchool.id


        return obj
    }

    const handleSubmit = () => {

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
                <div className={styles.signup__email__container}>
                    <label htmlFor='signupImgUrl'>
                        <input id='signupImgUrl' placeholder="Profile Image Url" className={styles.signup__email} type='text' name='profile_img_url' onChange={(e) => setProfile_img_url(e.target.value)} value={profile_img_url} />
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
                <button className={`cta_button ${styles.signup__submit}`} type='submit'>Sign Up</button>
            </form>

        </div>

    )


}

export default EditUser
