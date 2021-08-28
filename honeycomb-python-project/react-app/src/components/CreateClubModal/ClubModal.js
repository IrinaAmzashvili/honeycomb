import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postClub } from "../../store/clubs";
import { joinClub } from "../../store/membership";
import styles from "../../FormModal.module.css";

function CreateClub({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = new FormData();
    const newClub = {
      name,
      description,
      img_url: image,
      category_id: category,
    };
    for (let key in newClub) {
        form_data.append(key, newClub[key]);
    }

    const data = await dispatch(postClub(form_data));
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    dispatch(joinClub(data.id));
    setShowModal(false);
    history.push(`/clubs/${data.id}`);
  };

  return (
    <div className={styles.club__form__div}>
      <form onSubmit={handleSubmit}>
        <div className={styles.club__heading_container}>
          <h1 className={styles.club__form__heading}>Create A Club</h1>
        </div>
        <ul className={styles.errors__container}>
          {errors &&
            errors.map((error, i) => (
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
            id="name"
            className={styles.club__name}
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.club__label__container}>
          <label htmlFor="imgUrl" className={styles.club__form__label}>
            Club Image URL
          </label>
        </div>
        <div>
          <input
            id="imgUrl"
            className={styles.club__name}
            name="imgUrl"
            type="file"
            accept="image/*"
            onChange={updateImage}
          />
        </div>

        <div className={styles.club__label__container}>
          <label htmlFor="category" className={styles.club__form__label}>
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
          <label htmlFor="description" className={styles.club__form__label}>
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
          <button className="cta_button" type="submit">
            Submit Club
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateClub;
