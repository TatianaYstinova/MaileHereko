import { IResponse, MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteMovie } from '../../entities/favorites';

interface SetMoviesPayloadAction {
    movie: IResponse<MovieDtoV13>;
}
interface SetFavoritesPayloadAction {
    favoriteMovie: FavoriteMovie[];
}

export interface FilmPageState {
    movie: IResponse<MovieDtoV13> | null;
    favorites: FavoriteMovie[] | null;
}

const initialState: FilmPageState = {
    movie: null,
    favorites: [],
};
const filmPageSlice = createSlice({
    name: 'filmPage',
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<SetMoviesPayloadAction>) {
            const { movie } = action.payload;
            state.movie = movie;
        },
        setFavorites(state, action: PayloadAction<SetFavoritesPayloadAction>) {
            const { favoriteMovie } = action.payload;
            state.favorites = favoriteMovie;
        }
    },
});

export const { setMovies, setFavorites } = filmPageSlice.actions;

export const filmPageReducer = filmPageSlice.reducer;
