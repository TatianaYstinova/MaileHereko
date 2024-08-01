interface AddFavoriteRequestParameters {
    userId: string;
    favoritedMovieId: number;
}

export const addToFavorites = async (params: AddFavoriteRequestParameters) => {
    const response = await fetch('http://localhost:777/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};