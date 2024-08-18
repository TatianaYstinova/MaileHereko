import { IResponse, MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client';

export const getMovieById = async(id:number):Promise<IResponse<MovieDtoV13>> => {
    const response = await fetch(`http://localhost:777/movies?id=${id}`);

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}