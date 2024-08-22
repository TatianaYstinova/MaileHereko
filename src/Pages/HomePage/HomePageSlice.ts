import { Filter, MovieDtoV13, MovieFields } from '@openmoviedb/kinopoiskdev_client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoviesData {
  totalCount: number;
  pages: number;
}

export interface MovieState {
  moviesData: MoviesData;
  movies: MovieDtoV13[];
  filter: Filter<MovieFields>;
}

const initialState: MovieState = {
  moviesData: {
    totalCount: 0,
    pages: 0,
  },
  movies: [],
  filter: {
    page: 1,
    limit: 8,
  },
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesData(state, action: PayloadAction<MoviesData>) {
      state.moviesData = action.payload;
    },
    setMovies(state, action: PayloadAction<MovieDtoV13[]>) {
      
      state.movies = action.payload;
    },
    addMovies(state, action: PayloadAction<MovieDtoV13[]>) {
      state.movies.push(...action.payload);
    },
    setFilter(state, action: PayloadAction<Filter<MovieFields>>) { 
      state.filter = action.payload;
    },

  },
});

export const homePageActions = movieSlice.actions;

export const homePageReducer = movieSlice.reducer;