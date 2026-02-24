import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteReq, getReq, patchReq, postReq } from '../../../config/configAxios';
import type {
    AddCouponReq,
    AddCouponRes,
    Coupon,
    DeleteCouponRes,
    GetCouponsRes,
    UpdateCoupon,
    UpdateCouponReq,
    UpdateCouponRes
} from '../../../types/couponTypes';


// Define a type for the slice state
interface CouponState {
    coupons: Coupon[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

export const getCoupons = createAsyncThunk(
    'admin/coupons/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetCouponsRes>("/api/v1/coupon/")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch coupons: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

export const createCoupon = createAsyncThunk(
    'admin/coupons/create',
    async (coupon: AddCouponReq, { rejectWithValue }) => {
        try {
            const response = await postReq<AddCouponReq, AddCouponRes>(
                "/api/v1/coupon/",
                coupon
            )
            return response.data
        } catch (error: any) {
            console.log('Error while coupon role: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)

export const updateCoupon = createAsyncThunk(
    'admin/coupons/update',
    async ({ couponId, data }: UpdateCouponReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<UpdateCoupon, UpdateCouponRes>(
                `/api/v1/coupon/${couponId}`,
                data
            )
            return response.data
        } catch (error: any) {
            console.log('Error while updating coupon: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)
export const deleteCoupon = createAsyncThunk(
    'coupon/delete',
    async (couponId: string, { rejectWithValue }) => {
        try {
            const response = await deleteReq<DeleteCouponRes>(`/api/v1/coupon/${couponId}`)
            return { ...response.data, couponId }
        } catch (error: any) {
            console.log('Error while delete coupon: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

// Define the initial state using that type
const initialState: CouponState = {
    coupons: [],
    loading: 'idle'
}

export const couponSlice = createSlice({
    name: 'coupons-admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get coupons
            .addCase(getCoupons.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getCoupons.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.coupons = payload.data
            })
            .addCase(getCoupons.rejected, (state) => {
                state.loading = 'failed'
            })

            // create coupon
            .addCase(createCoupon.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(createCoupon.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.coupons.push(payload.data)
            })
            .addCase(createCoupon.rejected, (state) => {
                state.loading = 'failed'
            })

            // update coupon
            .addCase(updateCoupon.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(updateCoupon.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                const index = state.coupons.findIndex(c => c._id === payload.data._id)
                if (index !== -1) {
                    state.coupons.splice(index, 1, payload.data)
                }
            })
            .addCase(updateCoupon.rejected, (state) => {
                state.loading = 'failed'
            })
            // delete coupon
            .addCase(deleteCoupon.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(deleteCoupon.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                const index = state.coupons.findIndex(c => c._id === payload.couponId)
                if (index !== -1) {
                    state.coupons.splice(index, 1)
                }
            })
            .addCase(deleteCoupon.rejected, (state) => {
                state.loading = 'failed'
            })

    }


})

export default couponSlice.reducer