import { IResponse, MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteMovie } from '../../entities/favorites';
import { SimiralMovie } from '../../entities/moviesSelection';

interface SetMoviesPayloadAction {
    movie: IResponse<MovieDtoV13>;
}
interface SetFavoritesPayloadAction {
    favoriteMovie: FavoriteMovie[];
}
interface SetSimilarMoviePayloadAction {
    similarMovies: SimiralMovie[];
}

export interface FilmPageState {
    movie: IResponse<MovieDtoV13> | null;
    favorites: FavoriteMovie[] ;
    similarMovies: SimiralMovie[] 
}

const initialState: FilmPageState = {
    movie: null,
    favorites: [],
    similarMovies:[]
};
const filmPageSlice = createSlice({
    name: 'filmPage',
    initialState,
    reducers: {
        setMovie(state, action: PayloadAction<SetMoviesPayloadAction>) {
            const { movie } = action.payload;
            state.movie = movie;
        },
        setFavorites(state, action: PayloadAction<SetFavoritesPayloadAction>) {
            const { favoriteMovie } = action.payload;
            state.favorites = favoriteMovie;
        },
        setSimilarMovies(state,action:PayloadAction<SetSimilarMoviePayloadAction>){
            const {similarMovies} = action.payload;
            state.similarMovies=similarMovies;
        }

    },
});

export const filmPageActions = filmPageSlice.actions;

export const filmPageReducer = filmPageSlice.reducer;
