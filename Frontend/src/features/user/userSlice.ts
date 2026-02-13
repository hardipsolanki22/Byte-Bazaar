import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { LogoutUserResponse, UserData, UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse, VerifyEanilResponse } from '../../types/userTypes';
import { getReq, patchReq, postReq } from '../../config/configAxios';

// Define a type for the slice state
interface UserState {
    userData: UserData | null;
    isAuthenticated: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const registerUser = createAsyncThunk(
    'users/register',
    async (userData: UserRegisterRequest, { rejectWithValue }) => {
        try {
            const response = await postReq<UserRegisterRequest, UserRegisterResponse>(
                "/api/v1/users/register",
                userData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const verifyEmail = createAsyncThunk(
    'users/verify-email',
    async (verificationToken: string, { rejectWithValue }) => {
        try {
            const response = await patchReq<string, VerifyEanilResponse>(
                `/api/v1/users/verify-email/${verificationToken}`
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const loginUser = createAsyncThunk(
    'users/login',
    async (userData: UserLoginRequest, { rejectWithValue }) => {
        try {
            const response = await postReq<UserLoginRequest, UserLoginResponse>(
                "/api/v1/users/login",
                userData,
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const currentUser = createAsyncThunk(
    'users//current-user',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<UserRegisterResponse>(
                "/api/v1/users/current-user",
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const logOutUser = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await postReq<any, LogoutUserResponse>("/api/v1/users/logout")
            return response.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

// Define the initial state using that type
const initialState: UserState = {
    isAuthenticated: false,
    userData: null,
    loading: 'idle'
}

export const counterSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // register user 
            .addCase(registerUser.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = 'failed'
            })

            // verify email
            .addCase(verifyEmail.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(verifyEmail.fulfilled, (state, { payload }) => {
                state.loading = "succeeded"
                if (state.userData) {
                    state.userData.isEmailVerified = payload.data.isEmailVerified
                }
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.loading = "failed"
                state.userData = null
            })

            // login user
            .addCase(loginUser.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = "succeeded"
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = "failed"
            })

            // current user
            .addCase(currentUser.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(currentUser.fulfilled, (state, { payload }) => {
                state.loading = "succeeded"
                state.isAuthenticated = true
                state.userData = payload.data
            })
            .addCase(currentUser.rejected, (state) => {
                state.loading = "failed"
                state.userData = null
                state.isAuthenticated = false
            })

            // logout user
            .addCase(logOutUser.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.loading = "succeeded"
                state.isAuthenticated = false
                state.userData = null
            })
            .addCase(logOutUser.rejected, (state) => {
                state.loading = "failed"
            })
    }

})

export default counterSlice.reducer