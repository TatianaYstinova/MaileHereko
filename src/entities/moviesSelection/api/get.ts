import { MoviesSelection } from "../types";

export const getMoviesSelection = async (movieId:number):Promise<MoviesSelection[]>=>{
    const response = await fetch(`http://localhost:777/moviesSelection?movieId=${movieId}`);
    const data = await response.json();

    return data;
}