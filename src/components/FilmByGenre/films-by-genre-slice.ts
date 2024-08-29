import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface SetOrAddMoviesActionPayload {
    movies: MovieDtoV13[];
}

export interface FilmsByGenreState {
    movies: MovieDtoV13[];
}

const initialState: FilmsByGenreState = {
    movies: [],
}
const filmsByGenreSlice = createSlice({
    name: 'filmsByGenre',
    initialState,
    reducers: {
        setMovies(state, actions: PayloadAction<SetOrAddMoviesActionPayload>) {
            const { movies } = actions.payload
            state.movies = movies;
        },
        addMovies(state, actions: PayloadAction<SetOrAddMoviesActionPayload>) {
            const { movies } = actions.payload;
            state.movies.push(...movies);
        }
    }
})
export const filmsByGenreActions = filmsByGenreSlice.actions;

export const filmsByGenreReducer = filmsByGenreSlice.reducer;

export const moviesByGenreSelector = (state: RootState) => state.filmsByGenre.movies;