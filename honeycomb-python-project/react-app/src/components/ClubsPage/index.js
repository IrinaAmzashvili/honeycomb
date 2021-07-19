import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubs, postClub } from "../../store/clubs";


const ClubsPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [category, setCategory] = useState(1)


  useEffect(async () => {
    await dispatch(getClubs())
  }, [dispatch])

  const clubs = useSelector(state => Object.values(state.clubs))

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClub = {
      name,
      description,
      img_url: imgUrl,
      category_id: category,

    }
    await dispatch(postClub(newClub))

    // return await dispatch(postClub({
    //   name,
    //   description,
    //   img_url: imgUrl,
    //   category_id: category,
    // }))
    // error handling goes here

  }




  return (
    <div>
      {clubs.map((club) => (
        <div>{club.name}</div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="name" type="text" placeholder="Club Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <textarea name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <input name="imgUrl" type="text" placeholder="Club Img Url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
          </div>
          <div>
            <input name="category" type="number" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div>
            <button type="submit">Submit Form</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ClubsPage;
