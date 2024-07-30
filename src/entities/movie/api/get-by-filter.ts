import { Filter, MovieFields } from '@openmoviedb/kinopoiskdev_client';
import { kp } from '../../../shared/kp-client';

export const getAllMoviesFilter = (parameters: Filter<MovieFields>) => kp.movie.getByFilters(parameters);
