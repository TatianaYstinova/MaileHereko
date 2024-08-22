interface User {
    email: string;
    password: string;
}
export const getUsers = async (email: string, password: string): Promise<User> => {
    const response = await fetch(`http://localhost:777/users?email=${email}&password=${password}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}