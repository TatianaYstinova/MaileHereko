import { RootState } from "./store";

export const isUathorizedSelector = (state:RootState) => state.app.isAuthorized;