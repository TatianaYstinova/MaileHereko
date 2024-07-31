import { FavoriteMovie } from "../types";

export const getFavorites = async (userId: string):Promise<FavoriteMovie[]> => {
    const response = await fetch(`http://localhost:777/favorites?userId=${userId}`);
    const data = await response.json();

    return data;
} 