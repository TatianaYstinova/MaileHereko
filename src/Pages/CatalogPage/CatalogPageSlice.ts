import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "../../entities/genre/api";
import { RootState } from "../../store/store";

export interface CataloguePageState {
  genres: Genre[];
}

export interface SetGenresActionPayload {
  genres:Genre[]
}

const initialState: CataloguePageState = {
  genres:[]
}
const cataloguePageSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setGenres(state, action:PayloadAction<SetGenresActionPayload>){
      const {genres} = action.payload;
      state.genres = genres;
    } 
  }
})
export const cataloguePageActions = cataloguePageSlice.actions;

export const cataloguePageReducer = cataloguePageSlice.reducer;


export const genreSelector = (state:RootState)=>state.catalogPage.genres;