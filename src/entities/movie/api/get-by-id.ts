import { kp } from '../../../shared/kp-client';

export const getMovieById = (id:number) => kp.movie.getById(id);