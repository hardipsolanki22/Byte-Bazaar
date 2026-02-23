import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getReq, patchReq } from '../../../config/configAxios';
import type { AssignRoleReq, AssignRoleRes, GetUsersRes, Role, Users } from '../../../types/user';


// Define a type for the slice state
interface UsersState {
    users: Users[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

export const getUsersList = createAsyncThunk(
    'admin/users/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetUsersRes>("/api/v1/users/list")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch users: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

export const assignRole = createAsyncThunk(
    'admin/users/assign-role',
    async ({ userId, role }: AssignRoleReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<Role, AssignRoleRes>(
                `/api/v1/users/assign-role/${userId}`,
                { role }
            )
            return response.data
        } catch (error: any) {
            console.log('Error while assign user role: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)

// Define the initial state using that type
const initialState: UsersState = {
    users: [],
    loading: 'idle'
}

export const userSlice = createSlice({
    name: 'users-admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get addresses
            .addCase(getUsersList.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getUsersList.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.users = payload.data.users
            })
            .addCase(getUsersList.rejected, (state) => {
                state.loading = 'failed'
            })

            // aissign role
            .addCase(assignRole.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(assignRole.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                const updatedUser = payload.data
                state.users = state.users.map(user => user._id === updatedUser._id ? { ...user, role: updatedUser.role } : user)
            })
            .addCase(assignRole.rejected, (state) => {
                state.loading = 'failed'
            })

    }


})

export default userSlice.reducer