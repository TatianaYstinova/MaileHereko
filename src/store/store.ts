import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { filmPageReducer } from '../Pages/FilmPage/FilmPageSlice';
import { homePageReducer } from '../Pages/HomePage/HomePageSlice';
import { AppState, SetIsAuthorizedActionPayload } from './types';
import { cataloguePageReducer } from '../Pages/CataloguePage/CataloguePageSlice';

const initialState: AppState = {
  isAuthorized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<SetIsAuthorizedActionPayload>) {
      state.isAuthorized = action.payload.isAuthorized;
    }
  }
});

export const appActions = {
  ...appSlice.actions,
}

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    filmPage: filmPageReducer,
    homePage: homePageReducer,
    catalogPage:cataloguePageReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;