import styles from "../ClubsCard/ClubsCard.module.css";
import { Link } from "react-router-dom";

const ClubsCard = ({ club }) => {

  return (
    <div className={styles.cardContainerContainer}>
      <Link key={club?.id} className={styles.clubName} to={`/clubs/${club?.id}`}>
        <div className={styles.ClubsCardDiv}>
          <div className={styles.clubImgDiv}>
            <img className={styles.ClubsCardImg} src={club.img_url}></img>
          </div>
          <div className={styles.ClubsCardContent}>
            <div>{club.name}</div>
            <div className={styles.clubDescription}>{club.description}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClubsCard;
