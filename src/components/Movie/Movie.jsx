import { DateRangeOutlined, StarRate, Theaters, TheatersOutlined, ThumbUp } from '@mui/icons-material';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getMovieorShow, getSingleMovieorShow,clearMovieorShow } from '../../features/movies/movieSlice';
import "./Movie.scss"
const Movie = () => {
  const dispatch = useDispatch();
  const item = useSelector(getMovieorShow);
  const id = useParams().id;

  useEffect(() => {
    dispatch(getSingleMovieorShow(id));
    return(()=>{
      dispatch(clearMovieorShow());
    })
  }, [dispatch, id])
  console.log(item)
  return (
    <div className='movieWrapper'>
      <div className="movieLeft">
        <h4>{item.Title}</h4>
        <div className="itemInfo">
          <div className="infoTop">
              <div className="item">
                <span>IMDB Rating</span>
                <StarRate style={{ color:'rgb(231, 175, 69)'}}/>
                <span>{item.imdbRating}</span>
              </div>
              <div className="item">
                <span>IMDB Votes</span>
                <ThumbUp/>
                <span>{item.imdbVotes}</span>
              </div>
              <div className="item">
                <span>Runtime</span>
                <TheatersOutlined/>
                <span>{item.Runtime}</span>
              </div>
              <div className="item">
                <span>Year</span>
                <DateRangeOutlined/>
                <span>{item.Year}</span>
              </div>
          </div>
          <div className="infoBottom">
            <p className="plot">
              {item.Plot}
            </p>
            <p className="details"> <span>Director: </span>{item.Director}</p>
            <p className="details"> <span>Stars: </span>{item.Actors}</p>
            <p className="details"> <span>Genres: </span>{item.Genre}</p>
            <p className="details"> <span>Languages: </span>{item.Language}</p>
            <p className="details"> <span>Award: </span>{item.Awards}</p>
          </div>
        </div>
      </div>
      <div className="movieRight">
          <img src={item.Poster} alt="" />
      </div>
    </div>
  )
}

export default Movie