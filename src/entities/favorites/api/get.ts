import { FavoriteMovie } from "../types";

export const getFavorites = async (userId: string):Promise<FavoriteMovie[]> => {
    const response = await fetch(`http://localhost:777/favorites?userId=${userId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
} 