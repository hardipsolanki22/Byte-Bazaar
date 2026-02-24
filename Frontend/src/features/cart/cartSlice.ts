import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getReq, patchReq } from '../../config/configAxios';
import type {
    addItemOrUpdateItemQuantityReq,
    Cart,
    GetCartRes
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
    async ({ productSlug, quantity }: addItemOrUpdateItemQuantityReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<{ quantity: number }, GetCartRes>(
                `/api/v1/cart/products/${productSlug}`,
                { quantity }
            )
            return response.data
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
            const response = await patchReq<{}, GetCartRes>(
                `/api/v1/cart/products/${productSlug}`,
            )
            return response.data
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
            const response = await patchReq("/api/v1/cart/clear")
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

    }

})

export default cartSlice.reducer