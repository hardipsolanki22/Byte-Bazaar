import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../features/auth/authSlice"
import addressReducer from "../features/address/addressSlice"
import categorySlice from "../features/category/categorySlice"
import productSlice from '../features/product/productSlice'
import ratingSlice from '../features/rating/ratingSlice'
import userSlice from '../features/user/userSlice'
import couponSlice from '../features/coupon/couponSlice'
import orderSlice from '../features/order/orderSlice'
import bannerSlice from '../features/heroBanner/heroBannerSlice'
import cartSlice from '../features/cart/cartSlice'
import checkoutSlice from '../features/checkout/checkoutSlice'

export const store = configureStore({
  reducer: {
    users: authSlice, // rename -> user
    address: addressReducer,
    category: categorySlice,
    product: productSlice,
    rating: ratingSlice,
    userList: userSlice,
    coupon: couponSlice,
    order: orderSlice,
    banner: bannerSlice,
    cart: cartSlice,
    checkout: checkoutSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch