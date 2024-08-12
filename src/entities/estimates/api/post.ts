interface AddFilmScoreParameters {
    userId: string;
    movieId: number;
    grade: number
}

export const addFilmScores = async (params: AddFilmScoreParameters) =>
    fetch('http://localhost:777/filmScores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
    });
