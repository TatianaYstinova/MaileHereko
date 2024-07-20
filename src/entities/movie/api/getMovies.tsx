import { Movie } from "./types";
import{KINOPOISK_API} from '../../../components/api/const';

export const getAllMovies =() :Promise<Movie[]> => fetch(`${KINOPOISK_API}/movies`).then((response)=>response.json());