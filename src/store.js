import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import seedsReducer from './features/seeds/seedsSlice'
import userSessionReducer from './features/userSession/userSessionSlice'

export default configureStore({
  reducer: {
    userSession: userSessionReducer,
    user: userReducer,
    seeds: seedsReducer,
  },
})