import {FilmScore} from '../types';

export const getFilmScores = async(userId:string):Promise<FilmScore[]>=>{
    const response = await fetch(`http://localhost:777/filmScores?userId=${userId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}