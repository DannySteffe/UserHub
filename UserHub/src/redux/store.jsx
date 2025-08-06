// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  auth: {
    user: 'Admin'
  }
}

export const store = configureStore({
  reducer: {
    auth: (state = initialState.auth, action) => {
      return state
    }
  }
})