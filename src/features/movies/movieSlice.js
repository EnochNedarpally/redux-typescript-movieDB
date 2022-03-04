import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import movieApi from '../../common/api/movieApi'
import { APIKEY } from '../../common/api/movieApiKey'

const initialState = {
  movies:{},
  shows:{},
  single:{},
}

export const getAsyncMovies=createAsyncThunk("movies/getAsyncMovies",
    async()=>{
    const response = await movieApi.get(`?s=man&apikey=${APIKEY}&type=movie`)
    return response.data
  } 
)
export const getAsyncShows=createAsyncThunk("movies/getAsyncShows",
    async()=>{
    const response = await movieApi.get(`?s=how&apikey=${APIKEY}&type=series`)
    
    return response.data
  } 
)
export const getSingleMovieorShow=createAsyncThunk("movies/getSingleMovieorShow",
    async(id)=>{
    const response = await movieApi.get(`?i=${id}&apikey=${APIKEY}`)
    return response.data
  } 
)



export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovieorShow: (state) => {
      state.single = {}
    }
  },
  extraReducers:{
      [getAsyncMovies.pending]:()=>{
        console.log("Pending")
      },
      [getAsyncMovies.fulfilled]:(state,{payload})=>{
        console.log("Success")
        return {...state,movies:payload}
      },
      [getAsyncMovies.rejected]:()=>{
        console.log("Failed")
      },
      [getAsyncShows.fulfilled]:(state,{payload})=>{
        console.log(" Show Success")
        return {...state,shows:payload}
      },
      [getSingleMovieorShow.fulfilled]:(state,{payload})=>{
        console.log(" Show Success")
        return {...state,single:payload}
      },
  }
})
export const { clearMovieorShow } = movieSlice.actions
export const getAllMovies = state=>state.movies.movies;
export const getAllShows = state=>state.movies.shows;
export const getMovieorShow = state=>state.movies.single;
export default movieSlice.reducer