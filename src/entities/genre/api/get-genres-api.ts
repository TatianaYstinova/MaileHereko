import { IResponse, PossibleValueDto } from '@openmoviedb/kinopoiskdev_client';

export interface Genre {
    name: string;
    slug: string;
}

export const getGenresApi = async (filterFieldName: string): Promise<IResponse<PossibleValueDto[]>> => {
    const response = await fetch(`http://localhost:777/possible-filter-values?field=${filterFieldName}`);

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}