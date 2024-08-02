interface AddMoviesSelection{
    movieId:number,
    similarMovieId:number
    
}
export const addToSimilarMovies =(params:AddMoviesSelection)=>fetch('http://localhost:777/moviesSelection',{
    method :'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
})