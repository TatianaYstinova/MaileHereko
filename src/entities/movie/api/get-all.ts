import { kp } from '../../../shared/kp-client';

export const getAllMovies = (moviesSelectionId: number[] | undefined)=>kp.movie.getRandom();