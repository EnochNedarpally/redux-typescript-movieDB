import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCard.scss'
const MovieCard = ({movie}) => {
 
  return (
    <Link to={`/movie/${movie.imdbID}`}>
    <div className='movieContainer'>
        <div className="movieTop">
            <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="movieBottom">
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
        </div>
    </div>
    </Link>
  ) 
}

export default MovieCard