import { getReq, postReq } from '@/services/axiosInstance';
import { CreateOrderReq, CreateOrderRes, GetUserOrdersRes, GetUserSingleOrderRes, UserOrder, UserSingleOrder } from '@/types/order';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// Define a type for the slice state
interface OrderState {
    userOrders: UserOrder[] | null
    userSingleOrder: UserSingleOrder | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk

export const getUserOrders = createAsyncThunk(
    'order/users/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetUserOrdersRes>("/api/v1/order/user-orders")
            return response.data
        } catch (error: any) {
            console.log('Error while get user orders: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getUserSingleOrder = createAsyncThunk(
    'order/user/getSingle',
    async (orderId: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetUserSingleOrderRes>(`/api/v1/order/user-orders/${orderId}`)
            return response.data    
        } catch (error: any) {
            console.log('Error while fetch user single order: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

export const createOrder = createAsyncThunk(
    'order/create-order',
    async ({ addressId, paymentType }: CreateOrderReq, { rejectWithValue }) => {
        try {
            const response = await postReq<{ paymentType: "COD" | "STRIPE" }, CreateOrderRes>(
                `/api/v1/order/create-order-mobile/${addressId}`,
                { paymentType }

            )
            return response.data
        } catch (error: any) {
            console.log('Error while create order: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)

// Define the initial state using that type
const initialState: OrderState = {
    userOrders: [],
    userSingleOrder: null,
    loading: 'idle'
}

export const orderSlice = createSlice({
    name: 'order-admin',
    initialState,
    reducers: {
        clearUserSingleOrder: (state) => {
            state.userSingleOrder = null
        }
    },
    extraReducers: (builder) => {
        builder

            // create orders
            .addCase(createOrder.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(createOrder.rejected, (state) => {
                state.loading = 'failed'
            })

            // get user orders
            .addCase(getUserOrders.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getUserOrders.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.userOrders = payload.data.orders
            })
            .addCase(getUserOrders.rejected, (state) => {
                state.loading = 'failed'
            })
            // get single order
            .addCase(getUserSingleOrder.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getUserSingleOrder.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.userSingleOrder = payload.data
            })
            .addCase(getUserSingleOrder.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})
export const { clearUserSingleOrder } = orderSlice.actions
export default orderSlice.reducer