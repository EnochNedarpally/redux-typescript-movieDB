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
    async(input)=>{
    const response = await movieApi.get(`?s=${input}&apikey=${APIKEY}&type=movie`)
    console.log(response.data.Search)
    return response.data.Search
  } 
)
export const getAsyncShows=createAsyncThunk("movies/getAsyncShows",
    async(input)=>{
    const response = await movieApi.get(`?s=${input}&apikey=${APIKEY}&type=series`)
    return response.data.Search
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
        return {...state,shows:payload,loading:false}
      },
      [getSingleMovieorShow.pending.type]:(state)=>{
        state.loading=true
        state.error=false
      },
      [getSingleMovieorShow.rejected.type]:(state)=>{
        state.loading=false
        state.error=true
      },
      [getSingleMovieorShow.fulfilled.type]:(state,{payload})=>{
        return {...state,single:payload,loading:false}
      },
  }
})
export const { clearMovieorShow } = movieSlice.actions
export const getAllMovies = state=>state.movies.movies;
export const getAllShows = state=>state.movies.shows;
export const getMovieorShow = state=>state.movies.single;    
export default movieSlice.reducer