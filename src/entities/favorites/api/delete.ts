interface DeleteFromFavoriteRequestParameters {
    id: number;
}

export const deleteFromFavorites =  async ({ id: recordIdToDelete }: DeleteFromFavoriteRequestParameters) =>  {
    const response = await fetch(`http://localhost:777/favorites/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
};