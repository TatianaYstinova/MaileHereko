import { configureStore } from '@reduxjs/toolkit'
import { filmPageReducer } from '../Pages/FilmPage/FilmPageSlice';
import { homePageReducer } from '../Pages/HomePage/HomePageSlice';


export const store = configureStore({
  reducer: {
    filmPage: filmPageReducer,
    homePage: homePageReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;