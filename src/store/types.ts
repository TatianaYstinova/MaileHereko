export interface AppState {
  isAuthorized: boolean;
  isAuthorizing: boolean;
}

export interface SetIsAuthorizedActionPayload {
  isAuthorized: boolean;
}