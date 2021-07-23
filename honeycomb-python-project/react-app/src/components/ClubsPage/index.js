import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoSearch } from "react-icons/go";
import { getClubs } from "../../store/clubs";
import { getSchool } from "../../store/schools";
import ClubsCard from "../ClubsCard";
import ClubModal from "../CreateClubModal";
import homeBackground from "../../images/homeBackground.png";
import styles from "../ClubsPage/ClubsPage.module.css";


const ClubsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("0");
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

  const school = useSelector((state) => Object.values(state?.school)[0]);
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
//---------------------------------------------------------------filter------------------------------------------------


  const handleFilter = (event)=>{
    const selectedIndex = event.target.options.selectedIndex;
    setSelectedCategory(event.target.options[selectedIndex].value)
  }


  return (
    <div className={styles.clubsPageContainer}>
      <div className={styles.backgroundImgDiv}>
        <img className={styles.homeBackground} src={homeBackground}></img>
      </div>

      <div className={styles.clubsOuterDiv}>
        <div className={styles.clubsTopTwoLine}>
          <div className={styles.clubTitle}>CLUBS AT {school?.name}</div>
          <div className={styles.clubsFirstContainer}>
            <ClubModal className={styles.startButton} />
            <div className={styles.clubsFirstContainerRight}>
              <div className={styles.categoryFilterGroup}>
                <select className={styles.categorySelect}  onChange={(e)=>handleFilter(e)}>
                  <option className={styles.categoryOptions} value="0">
                    Filtered by Category
                  </option>
                  <option className={styles.categoryOptions} value="1">
                    Social
                  </option>
                  <option className={styles.categoryOptions} value="2">
                    Academic
                  </option>
                  <option className={styles.categoryOptions} value="3">
                    Political
                  </option>
                  <option className={styles.categoryOptions} value="4">
                    Theater and Art
                  </option>
                  <option className={styles.categoryOptions} value="5">
                    Cultural
                  </option>
                  <option className={styles.categoryOptions} value="6">
                    Sports and Recreation
                  </option>
                  <option className={styles.categoryOptions} value="7">
                    Religious
                  </option>
                  <option className={styles.categoryOptions} value="8">
                    Community Service
                  </option>
                  <option className={styles.categoryOptions} value="9">
                    Media and Publication
                  </option>
                </select>
              </div>
              <div className={styles.searchBarContainer}>
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
        <div className={styles.clubCardContainer}>
          {clubs
          .filter((club)=>{
              return club?.category_id === selectedCategory || selectedCategory === "0"
            })
          .map((club) => (
            <ClubsCard club={club} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
