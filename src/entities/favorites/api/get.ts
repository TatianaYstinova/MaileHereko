
export const getFavorites = async (userId: string) => {
    const response = await fetch(`http://localhost:777/favorites?userId=${userId}`);
    const data = await response.json();

    return data;
} 