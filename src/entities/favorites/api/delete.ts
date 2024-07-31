interface DeleteFromFavoriteRequestParameters {
    id: number;
}

export const deleteFromFavorites = ({ id: recordIdToDelete }: DeleteFromFavoriteRequestParameters) => fetch(`http://localhost:777/favorites/${recordIdToDelete}`, {
    method: 'DELETE',
})