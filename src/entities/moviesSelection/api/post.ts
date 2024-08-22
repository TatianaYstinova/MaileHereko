interface AddSimilarMovies{
    movieId:number,
    similarMovieId:number
    
}
export const addToSimilarMovies =(params:AddSimilarMovies)=>fetch('http://localhost:777/similarMovies',{
    method :'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
})