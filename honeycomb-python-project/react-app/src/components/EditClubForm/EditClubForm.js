import React, { useState } from "react";
import { editClub } from "../../store/clubs";
import { useDispatch } from "react-redux";
import styles from '../../FormModal.module.css'

const EditClubForm = ({ club, setShowModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(club.name);
  const [description, setDescription] = useState(club.description);
  const [imgUrl, setImgUrl] = useState(club.img_url);
  const [category, setCategory] = useState(club.category_id);

  const editForm = (event) => {
    event.preventDefault();

    const editedFormInfo = {
      name,
      description,
      img_url: imgUrl,
      category_id: category,
    };
    dispatch(editClub(club.id, editedFormInfo));
    setShowModal(false);
  };

  return (
    <div className={styles.club__form__div}>
      <form onSubmit={editForm}>
        <div className={styles.club__heading_container}>
          <h1 className={styles.club__form__heading}>Edit Form</h1>
        </div>
        <div className={styles.club__label__container}>
          <label for="name" className={styles.club__form__label}>
            Club Name
          </label>
        </div>
        <div>
          <input
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className={styles.club__name}
          />
        </div>
        <div className={styles.club__label__container}>
          <label for="imgUrl" className={styles.club__form__label}>
            Club Image URL
          </label>
        </div>
        <div>
          <input
            name="img_url"
            placeholder="Image Url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className={styles.club__name}
          />
        </div>
        <div className={styles.club__label__container}>
          <label for="category" className={styles.club__form__label}>
            Category
          </label>
        </div>
        <div>
          <select
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
          <label for="description" className={styles.club__form__label}>
            Description
          </label>
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className={styles.club__description}
          ></textarea>
        </div>
        <div className={styles.button__div}>
          <button className='cta_button'>Edit Club</button>
        </div>
      </form>
    </div>
  );
};

export default EditClubForm;
