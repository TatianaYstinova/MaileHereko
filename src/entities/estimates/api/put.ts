interface EvaluationUpdateParameters {
    userId: string;
    movieId: number;
    grade: number;
    id:number;
}

export const EvaluationUpdate = async (params: EvaluationUpdateParameters) => {
    try {
        const response = await fetch('http://localhost:777/filmScores/${params.id}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: params.userId,
                movieId: params.movieId,
                grade: params.grade
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Failed to update evaluation', error);
        throw error;
    }
};
