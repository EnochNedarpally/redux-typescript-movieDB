import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import movieApi from '../../common/api/movieApi'
import { APIKEY } from '../../common/api/movieApiKey'
import { addMovies } from '../../features/movies/movieSlice'
import MovieList from '../MovieList/MovieList'
const Home = () => {
  return (
    <div>
      <MovieList/>
    </div>
  )
}

export default Home