import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import movieApi from '../../common/api/movieApi'
import { APIKEY } from '../../common/api/movieApiKey'

// type iState = {
//   movies:Movies[],
//   shows:Movies[],
//   single:SingleMovieShow[],
// }

const initialState= {
  movies:{},
  shows:{}, 
  single:{},
  loading:false,
  error:false,
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
      [getAsyncMovies.pending.type]:(state)=>{
        state.loading=true
      },
      [getAsyncMovies.fulfilled.type]:(state,{payload})=>{
        return {...state,movies:payload,loading:false}
      },
      [getAsyncMovies.rejected.type]:(state)=>{
        state.loading=false
        state.error=true
      },
      [getAsyncShows.fulfilled.type]:(state,{payload})=>{
        return {...state,shows:payload}
      },
      [getSingleMovieorShow.fulfilled.type]:(state,{payload})=>{
        return {...state,single:payload}
      },
  }
})
export const { clearMovieorShow } = movieSlice.actions
export const getAllMovies = state=>state.movies.movies;
export const getAllShows = state=>state.movies.shows;
export const getMovieorShow = state=>state.movies.single;
export default movieSlice.reducer