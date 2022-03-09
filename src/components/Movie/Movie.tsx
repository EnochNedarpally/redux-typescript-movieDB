import { DateRangeOutlined, StarRate, TheatersOutlined, ThumbUp } from '@mui/icons-material';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../features/hook';
import { getMovieorShow, getSingleMovieorShow, clearMovieorShow } from '../../features/movies/movieSlice';
import { SingleMovieShow } from '../../types/movie';
import NotFound from '../NotFound/NotFound';
import "./Movie.scss"
const Movie = () => {
  const dispatch = useAppDispatch();  
  const item = useAppSelector(getMovieorShow);
  const loading = useAppSelector<boolean>(state => state.movies.loading);
  const id = useParams().id;

  // type iDispatch={
  //   getSingleMovieorShow(id:string):AsyncThunk<any, void, {}>
  // }
  useEffect(() => {
    //@ts-ignore 
    dispatch(getSingleMovieorShow(id));
    return (() => {
      dispatch(clearMovieorShow());
    })
  }, [dispatch, id])
  return (
    <>
          <div className='movieWrapper'>
          {loading || item.Error ?(
            <>
            {loading ? <p className="loading">Loading...!</p> :  <p className="loading">{item.Error}</p>}
            </>
              ):
        (
          <>
            <div className="movieLeft">
              <h4>{item.Title}</h4>
              <div className="itemInfo">
                <div className="infoTop">
                  <div className="item">
                    <span>IMDB Rating</span>
                    <StarRate style={{ color: 'rgb(231, 175, 69)' }} />
                    <span>{item.imdbRating}</span>
                  </div>
                  <div className="item">
                    <span>IMDB Votes</span>
                    <ThumbUp />
                    <span>{item.imdbVotes}</span>
                  </div>
                  <div className="item">
                    <span>Runtime</span>
                    <TheatersOutlined />
                    <span>{item.Runtime}</span>
                  </div>
                  <div className="item">
                    <span>Year</span>
                    <DateRangeOutlined />
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
            </>
        ) }
          </div>
      
    </>
  )
}

export default Movie