import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getReq, patchReq, postReq } from '../../config/configAxios';
import type {
    CreateOrderReq,
    CreateOrderRes,
    FilterOrders,
    GetOrdersRes,
    GetSingleOrderRes,
    GetUserOrdersRes,
    GetUserSingleOrderRes,
    Order,
    SingleOrder,
    UpdateOrderStatusAndIsPaymentDone,
    UpdateOrderStatusAndIsPaymentDoneReq,
    UpdateOrderStatusAndIsPaymentDoneRes,
    UserOrder,
    UserSingleOrder
} from '../../types/orderTypes';

// Define a type for the slice state
interface OrderState {
    orders: Order[] | null;
    singleOrder: SingleOrder | null;
    userOrders: UserOrder[] | null
    userSingleOrder: UserSingleOrder | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const getOrders = createAsyncThunk(
    'order/get',
    async ({ status, ispaymentdone }: FilterOrders, { rejectWithValue }) => {
        try {
            const response = await getReq<GetOrdersRes>(
                `/api/v1/order/admin${status ? `?status=${status}` : ''}${ispaymentdone !== undefined ? `${status ? '&' : '?'}ispaymentdone=${ispaymentdone}` : ''}`
            )

            return response.data
        } catch (error: any) {
            console.log('Error while get orders: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getSingleOrder = createAsyncThunk(
    'order/getSingle',
    async (orderId: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetSingleOrderRes>(`/api/v1/order/admin/${orderId}`)
            return response.data
        } catch (error: any) {
            console.log('Error while fetch single order: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
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
export const updateOrderStatusAndIsPaymentDone = createAsyncThunk(
    'order/updateStatusAndPayment',
    async (
        { orderId, data }: UpdateOrderStatusAndIsPaymentDoneReq,
        { rejectWithValue }) => {
        try {
            const response = await patchReq<UpdateOrderStatusAndIsPaymentDone, UpdateOrderStatusAndIsPaymentDoneRes>(
                `/api/v1/order/admin/${orderId}`,
                data
            )
            return response.data
        } catch (error: any) {
            console.log('Error while update order status and isPaymentDone: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)
export const createOrder = createAsyncThunk(
    'order/create-order',
    async ({ addressId, paymentType }: CreateOrderReq, { rejectWithValue }) => {
        try {
            const response = await postReq<{ paymentType: "COD" | "STRIPE" }, CreateOrderRes>(
                `/api/v1/order/${addressId}`,
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
    orders: [],
    singleOrder: null,
    userOrders: [],
    userSingleOrder: null,
    loading: 'idle'
}

export const orderSlice = createSlice({
    name: 'order-admin',
    initialState,
    reducers: {
        clearSingleOrder: (state) => {
            state.singleOrder = null
        },
        clearUserSingleOrder: (state) => {
            state.userSingleOrder = null
        }
    },
    extraReducers: (builder) => {
        builder

            // get orders
            .addCase(getOrders.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getOrders.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.orders = payload.data.orders
            })
            .addCase(getOrders.rejected, (state) => {
                state.loading = 'failed'
            })
            // get single order
            .addCase(getSingleOrder.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getSingleOrder.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.singleOrder = payload.data
            })
            .addCase(getSingleOrder.rejected, (state) => {
                state.loading = 'failed'
            })
            // update order status and isPaymentDone
            .addCase(updateOrderStatusAndIsPaymentDone.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(updateOrderStatusAndIsPaymentDone.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                const { status, isPaymentDone } = payload.data
                if (state.singleOrder) {
                    state.singleOrder.status = status
                    state.singleOrder.isPaymentDone = isPaymentDone
                }
                if (state.orders) {
                    const index = state.orders.findIndex(o => o._id === state.singleOrder?._id)
                    if (index !== -1) {
                        state.orders[index].status = status
                        state.orders[index].isPaymentDone = isPaymentDone
                    }
                }
            })
            .addCase(updateOrderStatusAndIsPaymentDone.rejected, (state) => {
                state.loading = 'failed'
            })
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
export const { clearSingleOrder, clearUserSingleOrder } = orderSlice.actions
export default orderSlice.reducer