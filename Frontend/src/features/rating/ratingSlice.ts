import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getReq, postReq } from '../../config/configAxios';
import type {
    CreateRating,
    CreateRatingReq,
    CreateRatingRes,
    GetRatingRes,
    Rating
} from '../../types/ratingType';



// Define a type for the slice state
interface AddressState {
    rating: Rating | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const getRating = createAsyncThunk(
    'rating/get',
    async (productSlug: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetRatingRes>(
                `/api/v1/rating/products/${productSlug}`
            )
            return response.data
        } catch (error: any) {
            console.log('Error while fetch product rating: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const createRating = createAsyncThunk(
    'rating/create',
    async ({ comment, rating, slug }: CreateRatingReq, { rejectWithValue }) => {
        try {
            const response = await postReq<CreateRating, CreateRatingRes>(
                `/api/v1/rating/products/${slug}`,
                { comment, rating }
            )
            return response.data
        } catch (error: any) {
            console.log('Error while create product rating: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)



// Define the initial state using that type
const initialState: AddressState = {
    rating: null,
    loading: 'idle'
}

export const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get rating
            .addCase(getRating.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getRating.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.rating = payload.data.ratings[0]
            })
            .addCase(getRating.rejected, (state) => {
                state.loading = 'failed'
            })
            // create rating
            .addCase(createRating.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(createRating.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(createRating.rejected, (state) => {
                state.loading = 'failed'
            })


    }

})

export default ratingSlice.reducer