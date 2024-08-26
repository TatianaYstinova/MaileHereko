import { IResponse, PossibleValueDto } from '@openmoviedb/kinopoiskdev_client';

export interface Genre {
    name: string;
    slug: string;
}

export const getGenresApi = async (): Promise<IResponse<PossibleValueDto[]>> => {
    const response = await fetch(`http://localhost:777/genres`);

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}