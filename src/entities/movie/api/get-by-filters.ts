import { Filter, IQueryFields } from '@openmoviedb/kinopoiskdev_client';
import { kp } from '../../../shared/kp-client';

export const getMoviesByFilter = (filters: Filter<IQueryFields>) => kp.movie.getByFilters(filters);