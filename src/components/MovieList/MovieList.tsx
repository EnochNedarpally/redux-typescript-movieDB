import { Search } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../features/hook';
// import movieApi from '../../common/api/movieApi'
// import { APIKEY } from '../../common/api/movieApiKey'
import { getAllMovies, getAllShows, getAsyncMovies, getAsyncShows } from '../../features/movies/movieSlice'
import { Movies } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import "./MovieList.scss";

const MovieList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(getAllMovies);
  const shows = useAppSelector(getAllShows);
  const [input, setInput] = useState<string>("Man")
  useEffect(() => {
    dispatch(getAsyncMovies(input));
    dispatch(getAsyncShows(input));
  }, [dispatch,input])
  
  return (
    <div className='movieListContainer'>
      <div className="inputContainer">
        <input type="text" placeholder='Search Movies or Shows' onChange={(e)=>setInput(e.target.value)} />
        <Search/>
      </div>
      <h2>Movies</h2>
      <div className='movieListWrapper'>
        {!movies ? (
          <div>Sorry failed to load movies...</div>
        ) :
          movies.map((movie:Movies) =>
          (
            <MovieCard key={movie.Poster} movie={movie} />
          ))
        }
      </div>
        <h2>Series</h2>
      <div className='showWrapper'>
        {!shows ? (
          <div>Sorry failed to load shows...</div>
        ) :
          shows.map((show:Movies) =>
          (
            <MovieCard key={show.Poster} movie={show} />
          ))
        }
      </div>
    </div>
  )
}

export default MovieList;