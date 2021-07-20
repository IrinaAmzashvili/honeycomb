import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubs } from "../../store/clubs";
import ClubsCard from '../ClubsCard';
import styles from '../ClubsPage/ClubsPage.module.css'
import homeBackground from "../../images/homeBackground.png"
import { GoSearch } from 'react-icons/go';

const ClubsPage = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getClubs())
  }, [dispatch])

  let clubs = useSelector(state => Object.values(state.clubs))

  const [searchTerm, setSearchTerm] = useState("")
  const editSearch = (e)=>{
      setSearchTerm(e.target.value)
  }

  const dynamicSearch = ()=>{
    return clubs.filter(club=> club.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  clubs = dynamicSearch();

  return (
    <>

      <div className={styles.topBar} ></div>
      <div className={styles.clubsOuterDiv}>
        <div className={styles.clubsTopTwoLine}>
          <div className={styles.clubsFirstContainer}>
            <button className={styles.startButton}>
              Start a club
            </button>
            <div className={styles.clubsFirstContainerRight}>
              <div className={styles.categoryFilterGroup}>
                <select className={styles.categorySelect} >
                  {/* {eventCategories.map(eventCategory =>
                    <option key={eventCategory}>{eventCategory}</option>
                  )} */}
                  <option className={styles.categoryOptions} key="">Filtered by Category</option>
                </select>
              </div>
              <div className={styles.searchBarContainer}>
                {/* <i className ="fas fa-search"></i> */}
                <GoSearch className={styles.searchIcon} />
                <input placeholder="Search" className={styles.clubPageSearch} type="search" value={searchTerm} onChange={editSearch} />
              </div>
            </div>
          </div>

        </div>
        <div className={styles.clubTitle} >
            CLUBS AT YALE
        </div>
        <div className={styles.clubCardContainer} >
          {clubs.map((club) => (
            <ClubsCard club={club} />
          ))}
        </div>
      </div>
      <img className={styles.homeBackground} src={homeBackground}></img>
    </>
  )
}

export default ClubsPage;
