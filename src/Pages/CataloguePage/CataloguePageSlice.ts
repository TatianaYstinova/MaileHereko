import { IResponse, MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "../../entities/genre/api";
import { RootState } from "../../store/store";

interface SetMoviesActionPayload {
  movies: MovieDtoV13[];
}
export interface CataloguePageState {
  movies: MovieDtoV13[];
  genres: Genre[];
}

export interface SetGenresActionPayload {
  genres:Genre[]
}

const initialState: CataloguePageState = {
  movies: [],
  genres:[]
}
const cataloguePageSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setMovie(state, actions: PayloadAction<SetMoviesActionPayload>) {
      const { movies } = actions.payload
      state.movies = movies;
    },
    setGenres(state, action:PayloadAction<SetGenresActionPayload>){
      const {genres} = action.payload;
      state.genres = genres;
    } 
  }
})
export const cataloguePageActions = cataloguePageSlice.actions;

export const cataloguePageReducer = cataloguePageSlice.reducer;


export const genreSelector = (state:RootState)=>state.catalogPage.genres;