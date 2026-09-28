import {configureStore} from '@reduxjs/toolkit'
import productSlice from '../../features/product/states/ProductStates'
import authSlice from '../../features/auth/states/AuthStates'
export const store = configureStore({
    reducer : {
        productSlice : productSlice,
        authSlice : authSlice 
    }
})