import { Filter, IQueryFields, IResponse, MovieDocsResponseDtoV13 } from '@openmoviedb/kinopoiskdev_client';

export const getMoviesByFilter = async (filters: Filter<IQueryFields>): Promise<IResponse<MovieDocsResponseDtoV13>> => {
    const response = await fetch(
        'http://localhost:777/movies',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters),
        }
    );

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}