import { MoviesSelection } from "../types";

export const getMoviesSelection = async (movieId:number):Promise<MoviesSelection[]>=>{
    const response = await fetch(`http://localhost:777/moviesSelection?movieId=${movieId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}