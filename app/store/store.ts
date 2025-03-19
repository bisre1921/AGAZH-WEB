import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/loginSlice"
import housekeeperAuthReducer from "./slices/housekeeperAuthSlice"
import employerAuthReducer from "./slices/employerAuthSlice"

export const store = configureStore({
  reducer: {
    login: authReducer,
    housekeeperAuth: housekeeperAuthReducer,
    employerAuth: employerAuthReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

