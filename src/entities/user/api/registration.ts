interface RegistrationData {
    email: string;
    password: string;
    name: string;
}

export const registration = async (parameters: RegistrationData) => {
    const response = await fetch(
        'http://localhost:777/users',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters),
        }
    );

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}