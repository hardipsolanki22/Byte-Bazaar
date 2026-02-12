import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { UserData, UserRegisterRequest, UserResponse } from '../../types/userTypes';
import { postReq, type ApiError, type ApiResponse } from '../../config/configAxios';

// Define a type for the slice state


interface UserState {
    userData: UserData | null;
    isAuth: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const registerUser = createAsyncThunk(
    'users/register',
    async (userData: UserRegisterRequest, { rejectWithValue }) => {
        try {
            const response = await postReq<UserRegisterRequest, UserResponse>(
                "/api/v1/users/register",
                userData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response
        } catch (error: any) {
            console.log("error: ", error)
            return rejectWithValue({
                message: error.message,
                status: error.status,
                data: error.response?.data
            })
        }
    },
)

// Define the initial state using that type
const initialState: UserState = {
    isAuth: false,
    userData: null,
    loading: 'pending'
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // register user 
            .addCase(registerUser.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = 'pending'
                state.isAuth = payload.data.isEmailVerified
                state.userData = payload.data
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = 'failed'
                state.isAuth = false
            })
    }

})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer