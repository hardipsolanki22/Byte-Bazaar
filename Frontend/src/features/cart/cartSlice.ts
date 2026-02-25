import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getReq, patchReq, postReq } from '../../config/configAxios';
import type {
    AddItemOrUpdateItemQuantityReq,
    AddItemOrUpdateItemQuantityRes,
    Cart,
    ClearCartRes,
    GetCartRes,
    RemoveItemFromCartRes
} from '../../types/cartTypes';


// Define a type for the slice state
interface CartState {
    cart: Cart | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}


export const getUserCart = createAsyncThunk(
    'cart/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetCartRes>("/api/v1/cart")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch user cart: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const addItemOrUpdateItemQuantity = createAsyncThunk(
    'cart/add-update-quantity',
    async ({ productSlug, quantity }: AddItemOrUpdateItemQuantityReq, { rejectWithValue }) => {
        try {
            const response = await postReq<{ quantity: number }, AddItemOrUpdateItemQuantityRes>(
                `/api/v1/cart/products/${productSlug}`,
                { quantity }
            )
            return {
                data: {
                    ...response.data.data,
                    updatedProductItemslug: productSlug,
                },
                statusCode: response.data.statusCode,
                message: response.data.message,
                success: response.data.success
            }
        } catch (error: any) {
            console.log('Error while add or update item from cart: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const removeItemFromCart = createAsyncThunk(
    'cart/remove-item',
    async (productSlug: string, { rejectWithValue }) => {
        try {
            const response = await patchReq<{}, RemoveItemFromCartRes>(
                `/api/v1/cart/products/${productSlug}`,
            )
            return {
                data: {
                    ...response.data.data,
                    productSlug,
                },
                statusCode: response.data.statusCode,
                message: response.data.message,
                success: response.data.success
            }
        } catch (error: any) {
            console.log('Error while remove item from cart: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const clearCart = createAsyncThunk(
    'cart/clear',
    async (_, { rejectWithValue }) => {
        try {
            const response = await patchReq<{}, ClearCartRes>("/api/v1/cart/clear")
            return response.data
        } catch (error: any) {
            console.log('Error while clear cart: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

// Define the initial state using that type
const initialState: CartState = {
    cart: null,
    loading: 'idle'
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get user cart
            .addCase(getUserCart.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getUserCart.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.cart = payload.data
            })
            .addCase(getUserCart.rejected, (state) => {
                state.loading = 'failed'
            })

            // add or update item quantity from user cart
            .addCase(addItemOrUpdateItemQuantity.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(addItemOrUpdateItemQuantity.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                // console.log("payload: ", payload)
                // if (state.cart?.items.length) {
                //     const index = state.cart?.items.findIndex(item => item.product.slug === payload.data.updatedProductItemslug)
                //     if (index !== -1) {
                //         const updatedItemIndex = payload.data.items.findIndex(item => item.product === state.cart?.items[index].product._id)
                //         if (updatedItemIndex !== -1) {
                //             state.cart?.items.splice(index, 1, { ...state.cart.items[index], quantity: payload.data.items[updatedItemIndex].quantity })
                //         }
                //     }
                // }
            })
            .addCase(addItemOrUpdateItemQuantity.rejected, (state) => {
                state.loading = 'failed'
            })

            // remove item quantity from user cart
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(removeItemFromCart.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                // console.log("payload: ", payload)
                // if (state.cart?.items.length) {
                //     const index = state.cart?.items.findIndex(item => item.product.slug === payload.data.productSlug)
                //     if (index !== -1) {
                //         state.cart?.items.splice(index, 1)
                //     }
                // }
            })
            .addCase(removeItemFromCart.rejected, (state) => {
                state.loading = 'failed'
            })

            // clear user cart
            .addCase(clearCart.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = 'succeeded'
                if (state.cart) {
                    state.cart.items = []
                    state.cart.cartTotal = 0
                    state.cart.discountedTotal = 0
                    state.cart.discountValue = 0
                    state.cart._id = null;
                    state.cart.coupon = null;
                }

            })
            .addCase(clearCart.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export default cartSlice.reducer