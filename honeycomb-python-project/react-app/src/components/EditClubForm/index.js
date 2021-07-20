import React from 'react';
import styles from './EditClub.module.css';

// Club Name
// Club Image URL
// Category
// Description
const EditClubForm = () => {
    return (
        <>
            <div>
                <form>
                    <div className={styles.editHeadingContainer}>
                        <h1 className={styles.editHeading}>Edit Form</h1>
                    </div>
                    <label></label>
                    <input type='text' className={styles}>Club Name</input>
                    <input type='text' className={styles}>Club Image URL</input>
                    <input type='text' className={styles}>Category</input>
                    <input type='text' className={styles}>Description</input>
                </form>
            </div>
        </>
    )
}
