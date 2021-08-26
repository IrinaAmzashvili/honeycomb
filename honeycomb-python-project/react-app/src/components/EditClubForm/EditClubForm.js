import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editClub } from "../../store/clubs";
import { deleteClub } from "../../store/clubs";
import { leaveClub } from '../../store/membership'

import styles from "../../FormModal.module.css";

const EditClubForm = ({ club, setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(club.name);
  const [description, setDescription] = useState(club.description);
  const [imgUrl, setImgUrl] = useState(club.img_url);
  const [category, setCategory] = useState(club.category_id);

  const editForm = async (event) => {
    event.preventDefault();

    const editedFormInfo = {
      name,
      description,
      img_url: imgUrl,
      category_id: category,
    };
    const data = await dispatch(editClub(club.id, editedFormInfo));
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    setShowModal(false);
  };

  // delete club
  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(leaveClub(club?.id));
    const res = await dispatch(deleteClub(club?.id));
    // if successfully deleted, redirect
    if (res["message"]) {
      history.push("/clubs/");
    }
  };

  return (
    <div className={styles.club__form__div}>
      <form onSubmit={editForm}>
        <div className={styles.club__heading_container}>
          <h1 className={styles.club__form__heading}>Edit Form</h1>
        </div>
        <ul className={styles.errors__container}>
          {errors.map((error, i) => (
            <li className={styles.errors} key={i}>
              {error}
            </li>
          ))}
        </ul>
        <div className={styles.club__label__container}>
          <label htmlFor="name" className={styles.club__form__label}>
            Club Name
          </label>
        </div>
        <div>
          <input
            id='name'
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className={styles.club__name}
          />
        </div>
        <div className={styles.club__label__container}>
          <label htmlFor="imgUrl" className={styles.club__form__label}>
            Club Image URL
          </label>
        </div>
        <div>
          <input
            id='imgUrl'
            name="img_url"
            placeholder="Image Url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className={styles.club__name}
          />
        </div>
        <div className={styles.club__label__container}>
          <label htmlFor="category" className={styles.club__form__label}>
            Category
          </label>
        </div>
        <div>
          <select
            id='category'
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.club__name}
          >
            <option value="" disabled>
              Select a Category
            </option>
            <option value={1}>Social</option>
            <option value={2}>Academic</option>
            <option value={3}>Political</option>
            <option value={4}>Theater and Art</option>
            <option value={5}>Cultural</option>
            <option value={6}>Sports and Recreation</option>
            <option value={7}>Religious</option>
            <option value={8}>Community Service</option>
            <option value={9}>Media and Publication</option>
          </select>
        </div>
        <div className={styles.club__label__container}>
          <label htmlFor="description" className={styles.club__form__label}>
            Description
          </label>
        </div>
        <div>
          <textarea
            id='description'
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className={styles.club__description}
          ></textarea>
        </div>
        <div className={styles.button__div}>
          <button className={`${styles.editButton} cta_button`}>
            Edit Club
          </button>
          <button
            className={`${styles.deleteButton} cta_button_danger`}
            onClick={handleDelete}
          >
            Delete Club
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClubForm;
