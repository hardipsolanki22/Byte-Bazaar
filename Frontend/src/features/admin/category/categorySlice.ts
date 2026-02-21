import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteReq, getReq, patchReq, postReq } from '../../../config/configAxios';
import type {
    AddCtgReq,
    AddCtgRes,
    Category,
    DeleteCtgRes,
    GetCtgRes,
    UpdateCtg,
    UpdateCtgReq,
    UpdateCtgRes
} from '../../../types/categoryTypes';


// Define a type for the slice state
interface AddressState {
    catagories: Category[] | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const addCategory = createAsyncThunk(
    'category/add',
    async (name: AddCtgReq, { rejectWithValue }) => {
        try {
            const response = await postReq<AddCtgReq, AddCtgRes>(
                "/api/v1/categories/",
                name,
            )
            return response.data
        } catch (error: any) {
            console.log('Error while add catagory: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getCategories = createAsyncThunk(
    'category/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetCtgRes>("/api/v1/categories")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch categories: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const updateCategory = createAsyncThunk(
    'category/update',
    async ({ slug, data }: UpdateCtgReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<UpdateCtg, UpdateCtgRes>(
                `/api/v1/categories/${slug}`,
                data,
            )
            return response.data
        } catch (error: any) {
            console.log('Error while update category: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response = await deleteReq<DeleteCtgRes>(`/api/v1/categories/${slug}`)
            return { ...response.data, slug: slug }
        } catch (error: any) {
            console.log('Error while delete category: ', error)
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
    catagories: [],
    loading: 'idle'
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get categories
            .addCase(getCategories.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getCategories.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.catagories = payload.data
            })
            .addCase(getCategories.rejected, (state) => {
                state.loading = 'failed'
            })
            // add category
            .addCase(addCategory.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(addCategory.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.catagories?.push(payload.data)
            })
            .addCase(addCategory.rejected, (state) => {
                state.loading = 'failed'
            })
            // update category
            .addCase(updateCategory.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(updateCategory.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.catagories) {
                    const findAddIndex = state.catagories?.findIndex(cat => cat._id === payload.data._id)
                    if (findAddIndex !== -1) {
                        state.catagories?.splice(findAddIndex, 1, payload.data)
                    }

                }
            })
            .addCase(updateCategory.rejected, (state) => {
                state.loading = 'failed'
            })
            // delete category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.catagories?.lastIndexOf) {
                    const findAddIndex = state.catagories?.findIndex(cat => cat.slug === payload.slug)
                    if (findAddIndex !== -1) {
                        state.catagories?.splice(findAddIndex, 1)
                    }
                }
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export default categorySlice.reducer