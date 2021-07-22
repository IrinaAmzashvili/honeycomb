import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClubs } from "../../store/clubs";
import { getSchool } from "../../store/schools";
import ClubsCard from "../ClubsCard";
import styles from "../ClubsPage/ClubsPage.module.css";
import homeBackground from "../../images/homeBackground.png";
import { GoSearch } from "react-icons/go";

// import styles from './ClubsPage.module.css';
import ClubModal from "../CreateClubModal";

const ClubsPage = () => {
  //------------------------------------------------clubs---------------------------------------------
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getClubs());
  }, [dispatch]);

  let clubs = useSelector((state) => Object.values(state.clubs));
  //---------------------------------------------School----------------------------------------------------
  useEffect(async () => {
    await dispatch(getSchool());
  }, [dispatch]);

  const school = useSelector((state) => Object.values(state.school)[0]);
  console.log(school);
  //-------------------------------------------------Search--------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const editSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const dynamicSearch = () => {
    return clubs.filter((club) =>
      club?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  clubs = dynamicSearch();

  return (
    <div className={styles.clubsPageContainer}>
      <div className={styles.backgroundImgDiv}>
        <img className={styles.homeBackground} src={homeBackground}></img>
      </div>

      {/* <div className={styles.topBar} ></div> */}
      <div className={styles.clubsOuterDiv}>
        <div className={styles.clubsTopTwoLine}>
          <div className={styles.clubsFirstContainer}>
            {/* <button className={styles.startButton}>
              Start a club
            </button> */}
            <ClubModal className={styles.startButton} />
            <div className={styles.clubsFirstContainerRight}>
              <div className={styles.categoryFilterGroup}>
                <select className={styles.categorySelect}>
                  {/* {eventCategories.map(eventCategory =>
                    <option key={eventCategory}>{eventCategory}</option>
                  )} */}
                  <option className={styles.categoryOptions} key="">
                    Filtered by Category
                  </option>
                </select>
              </div>
              <div className={styles.searchBarContainer}>
                {/* <i className ="fas fa-search"></i> */}
                <GoSearch className={styles.searchIcon} />
                <input
                  placeholder="Search"
                  className={styles.clubPageSearch}
                  type="search"
                  value={searchTerm}
                  onChange={editSearch}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.clubTitle}>CLUBS AT {school?.name}</div>
        <div className={styles.clubCardContainer}>
          {clubs.map((club) => (
            <ClubsCard club={club} />
          ))}
        </div>
      </div>

      {/* {clubs.map((club) => (
        <Link key={club?.id} className={styles.club__name__link} to={`/clubs/${club?.id}`}>
          <p>{club?.name}</p>
        </Link>
      ))} */}
      {/* <ClubModal/> */}
    </div>
  );
};

export default ClubsPage;
