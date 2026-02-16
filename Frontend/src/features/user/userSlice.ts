import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getReq, patchReq, postReq } from '../../config/configAxios';
import type {
    ChangePasswordReq,
    ChangePasswordRes,
    ForgotPasswordReq,
    ForgotPasswordRequest,
    ForgotPasswordRes,
    LogoutUserResponse,
    UpdatePassword,
    UserAvatarUpdateReq,
    UserAvatarUpdateRes,
    UserData,
    UserLoginRequest,
    UserLoginResponse,
    UserRegisterRequest,
    UserRegisterResponse,
    UserUpdateRequest,
    UserUpdateResponse,
    VerifyEamilResponse
} from '../../types/userTypes';


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
            const response = await patchReq<string, VerifyEamilResponse>(
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
export const updateDetails = createAsyncThunk(
    'users/update-details',
    async (userData: UserUpdateRequest, { rejectWithValue }) => {
        try {
            const response = await patchReq<UserUpdateRequest, UserUpdateResponse>(
                "/api/v1/users/update-details",
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
export const updateAvatar = createAsyncThunk(
    'users/update-avatar',
    async (avatar: UserAvatarUpdateReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<UserAvatarUpdateReq, UserAvatarUpdateRes>(
                "/api/v1/users/update-avatar",
                avatar,
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
export const changePassword = createAsyncThunk(
    'users/change-password',
    async (userData: ChangePasswordReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<ChangePasswordReq, ChangePasswordRes>(
                "/api/v1/users/change-password",
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
export const forgotPasswordReq = createAsyncThunk(
    'users/forgot-password',
    async (email: ForgotPasswordReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<ForgotPasswordReq, ForgotPasswordRes>(
                "/api/v1/users/forgot-password",
                email,
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
export const forgotPassword = createAsyncThunk(
    'users/forgot-password-req',
    async (data: ForgotPasswordRequest, { rejectWithValue }) => {
        try {
            const { forgotPasswordToken, updatePasswordData } = data
            const response = await patchReq<UpdatePassword, ForgotPasswordRes>(
                `/api/v1/users/forgot-password/${forgotPasswordToken}`,
                updatePasswordData
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


// Define the initial state using that type
const initialState: UserState = {
    isAuthenticated: false,
    userData: null,
    loading: 'idle'
}

export const userSlice = createSlice({
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

            // update user details
            .addCase(updateDetails.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(updateDetails.fulfilled, (state, { payload }) => {
                state.loading = "succeeded"
                state.userData = { ...state.userData, ...payload.data }
            })
            .addCase(updateDetails.rejected, (state) => {
                state.loading = "failed"
            })

            // update user avatar details
            .addCase(updateAvatar.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(updateAvatar.fulfilled, (state, { payload }) => {
                state.loading = "succeeded"
                if (state.userData) state.userData = { ...state.userData, avatar: payload.data.avatar }
            })
            .addCase(updateAvatar.rejected, (state) => {
                state.loading = "failed"
            })

            // change password
            .addCase(changePassword.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = "succeeded"
            })
            .addCase(changePassword.rejected, (state) => {
                state.loading = "failed"
            })

            // forgot req password
            .addCase(forgotPasswordReq.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(forgotPasswordReq.fulfilled, (state) => {
                state.loading = "succeeded"
            })
            .addCase(forgotPasswordReq.rejected, (state) => {
                state.loading = "failed"
            })
            // forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = "pending"
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = "succeeded"
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.loading = "failed"
            })

    }

})

export default userSlice.reducer