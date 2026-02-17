import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../features/user/userSlice"
import addressReducer from "../features/address/addressSlice"
import categorySlice from "../features/admin/category/categorySlice"
import productSlice from '../features/admin/product/productSlice'
import ratingSlice from '../features/rating/ratingSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer, // rename -> user
    address: addressReducer,
    category: categorySlice,
    product: productSlice,
    rating: ratingSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch