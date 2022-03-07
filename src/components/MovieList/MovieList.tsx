import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import movieApi from '../../common/api/movieApi'
// import { APIKEY } from '../../common/api/movieApiKey'
import { getAllMovies, getAllShows, getAsyncMovies, getAsyncShows } from '../../features/movies/movieSlice'
import { Movies } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import "./MovieList.scss";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  useEffect(() => {
    dispatch(getAsyncMovies());
    dispatch(getAsyncShows());
  }, [dispatch])
  return (
    <div className='movieListContainer'>
      <h2>Movies</h2>
      <div className='movieListWrapper'>
        {!movies.Search ? (
          <div>Sorry failed to load movies...</div>
        ) :
          movies.Search.map((movie:Movies) =>
          (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        }
      </div>
        <h2>Series</h2>
      <div className='showWrapper'>
        {!shows.Search ? (
          <div>Sorry failed to load shows...</div>
        ) :
          shows.Search.map((show:Movies) =>
          (
            <MovieCard key={show.imdbID} movie={show} />
          ))
        }
      </div>
    </div>
  )
}

export default MovieList;