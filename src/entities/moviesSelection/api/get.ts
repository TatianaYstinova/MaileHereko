import { SimiralMovie } from "../types";

export const getSimilarMovies = async (movieId:number):Promise<SimiralMovie[]>=>{
    const response = await fetch(`http://localhost:777/similarMovies?movieId=${movieId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}