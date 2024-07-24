interface AddFavoriteRequestParameters {
    userId: string;
    favoritedMovieId: number;
}

export const addToFavorites = (params: AddFavoriteRequestParameters) => fetch('http://localhost:777/favorites', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
})