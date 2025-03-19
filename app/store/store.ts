import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import authReducer from "./slices/loginSlice"
import housekeeperAuthReducer from "./slices/housekeeperAuthSlice"
import employerAuthReducer from "./slices/employerAuthSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: authReducer,
    housekeeperAuth: housekeeperAuthReducer,
    employerAuth: employerAuthReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

