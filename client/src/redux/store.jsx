import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import adminReducer from './admin'

export const store = configureStore({
    reducer:{
        user: userReducer,
        admin: adminReducer,
    }
})