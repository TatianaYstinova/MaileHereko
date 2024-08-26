export interface AuthorizationData {
  email: string;
  password: string;
}

export interface AuthorizationResponse {
  accessToken: string;
  refreshToken: string;
}

export const authorize = async ({ email, password }: AuthorizationData): Promise<AuthorizationResponse> => {
  const response = await fetch(`https://194.87.210.5:10000/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

