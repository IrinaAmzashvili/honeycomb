import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postClub } from "../../store/clubs";
import styles from '../../FormModal.module.css'

function CreateClub({ setShowModal }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClub = {
      name,
      description,
      img_url: imgUrl,
      category_id: category,
    };
    dispatch(postClub(newClub));
    setShowModal(false);
  };

  return (
    <div className={styles.club__form__div}>
      <form onSubmit={handleSubmit}>
        <div className={styles.club__heading_container}>
          <h1 className={styles.club__form__heading}>Create A Club</h1>
        </div>
        <div className={styles.club__label__container}>
          <label for="name" className={styles.club__form__label}>
            Club Name
          </label>
        </div>
        <div>
          <input
            id="name"
            className={styles.club__name}
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.club__label__container}>
          <label for="imgUrl" className={styles.club__form__label}>
            Club Image URL
          </label>
        </div>
        <div>
          <input
            id="imgUrl"
            className={styles.club__name}
            name="imgUrl"
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>

        <div className={styles.club__label__container}>
          <label for="category" className={styles.club__form__label}>
            Category
          </label>
        </div>
        <div>
          <select
            id="category"
            className={styles.club__name}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            id="description"
            className={styles.club__description}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.button__div}>
          <button className='cta_button' type="submit">
            Submit Club
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateClub;
