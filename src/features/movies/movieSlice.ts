import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import movieApi from '../../common/api/movieApi'
import { APIKEY } from '../../common/api/movieApiKey'
import { Movies ,SingleMovieShow} from '../../types/movie'
import { RootState } from '../store'
const initialState= {
  movies:[{} as Movies ],
  shows:[{} as Movies ], 
  single:<SingleMovieShow>{},
  loading:false,
  error:false,
}
type iState = {
    movies?: Movies[];
    shows?: Movies[];
    single?: SingleMovieShow;
    loading?: boolean;
    error?: boolean;
}

export const getAsyncMovies=createAsyncThunk("movies/getAsyncMovies",
    async(input:string)=>{
    const response = await movieApi.get(`?s=${input}&apikey=${APIKEY}&type=movie`)
    return response.data.Search
  } 
)
export const getAsyncShows=createAsyncThunk("movies/getAsyncShows",
    async(input:string)=>{
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
    clearMovieorShow: (state:iState) => {
      state.single = {}
    }
  },
  extraReducers:{
      [getAsyncMovies.pending.type]:(state:iState)=>{
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
export const getAllMovies = (state:RootState)=>state.movies.movies;
export const getAllShows = (state:RootState)=>state.movies.shows;
export const getMovieorShow = (state:RootState)=>state.movies.single;   
export default movieSlice.reducer