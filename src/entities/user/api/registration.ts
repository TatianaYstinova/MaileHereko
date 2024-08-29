export interface RegistrationData {
    name: string;
    email: string;
    phone: string,
    address: string,
    birthDate: string,
    password: string;
}

export const registration = async (parameters: RegistrationData) => {
    const response = await fetch(
        'https://194.87.210.5:10000/api/users/sign-up',
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