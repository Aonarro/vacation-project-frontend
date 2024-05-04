import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
