import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteReq, getReq, postReq, putReq } from '../../../config/configAxios';
import type {
    AddAndUpdateHeroBanner,
    AddHeroBannerRes,
    DeleteHeroBannerRes,
    GetHeroBannersRes,
    HeroBaner,
    UpdateHeroBannerReq,
    UpdateHeroBannerRes
} from '../../../types/heroBannerTypes';


// Define a type for the slice state
interface HeroBannerState {
    banners: HeroBaner[] | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const addHeroBanner = createAsyncThunk(
    'banner/add',
    async ({ heroBanner }: AddAndUpdateHeroBanner, { rejectWithValue }) => {
        try {
            console.log(heroBanner)
            const response = await postReq<AddAndUpdateHeroBanner, AddHeroBannerRes>(
                "/api/v1/hero-banners/",
                { heroBanner },
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response.data
        } catch (error: any) {
            console.log('Error while add banner: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getHeroBanners = createAsyncThunk(
    'banner/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetHeroBannersRes>("/api/v1/hero-banners")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch hero banners: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const updateHeroBanner = createAsyncThunk(
    'benner/update',
    async ({ bannerId, data }: UpdateHeroBannerReq, { rejectWithValue }) => {
        try {
            const response = await putReq<AddAndUpdateHeroBanner, UpdateHeroBannerRes>(
                `/api/v1/hero-banners/${bannerId}`,
                data,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response.data
        } catch (error: any) {
            console.log('Error while update hero-banner: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const deleteHeroBanner = createAsyncThunk(
    'banner/delete',
    async (bannerId: string, { rejectWithValue }) => {
        try {
            const response = await deleteReq<DeleteHeroBannerRes>(`/api/v1/hero-banners/${bannerId}`)
            return { ...response.data, bannerId }
        } catch (error: any) {
            console.log('Error while delete hero-banner: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)



// Define the initial state using that type
const initialState: HeroBannerState = {
    banners: [],
    loading: 'idle'
}

export const bannerSlice = createSlice({
    name: 'hero-banners',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // add hero - banner
            .addCase(addHeroBanner.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(addHeroBanner.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.banners?.push(payload.data)
            })
            .addCase(addHeroBanner.rejected, (state) => {
                state.loading = 'failed'
            })

            // get hero - banners
            .addCase(getHeroBanners.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getHeroBanners.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.banners = payload.data
            })
            .addCase(getHeroBanners.rejected, (state) => {
                state.loading = 'failed'
            })

            // update hero - banners
            .addCase(updateHeroBanner.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(updateHeroBanner.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.banners?.length) {
                    const index = state.banners.findIndex(banner => banner._id === payload.data._id)
                    if (index !== -1) {
                        state.banners?.splice(index, 1, payload.data)
                    }
                }
            })
            .addCase(updateHeroBanner.rejected, (state) => {
                state.loading = 'failed'
            })
            // deleet hero - banners
            .addCase(deleteHeroBanner.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(deleteHeroBanner.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.banners?.length) {
                    const index = state.banners.findIndex(banner => banner._id === payload.bannerId)
                    console.log(index)
                    if (index !== -1) {
                        state.banners?.splice(index, 1)
                    }
                }
            })
            .addCase(deleteHeroBanner.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export default bannerSlice.reducer