import { configureStore } from '@reduxjs/toolkit'
import { filmPageReducer } from '../Pages/FilmPage/FilmPageSlice';


export const store = configureStore({
  reducer: {
    filmPage: filmPageReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;