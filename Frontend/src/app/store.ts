import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../features/auth/authSlice"
import addressReducer from "../features/address/addressSlice"
import categorySlice from "../features/admin/category/categorySlice"
import productSlice from '../features/admin/product/productSlice'
import ratingSlice from '../features/rating/ratingSlice'
import getUsersList from '../features/admin/user/userSlice'

export const store = configureStore({
  reducer: {
    users: authSlice, // rename -> user
    address: addressReducer,
    category: categorySlice,
    product: productSlice,
    rating: ratingSlice,
    userList: getUsersList
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch