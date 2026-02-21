import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteReq, getReq, patchReq, postReq } from '../../../config/configAxios';

import type {
    AddProductRes,
    DeleteProductRes,
    DeleteProductSubImage,
    DeleteProductSubImageReq,
    DeleteProductSubImageRes,
    GetProductRes,
    GetProductsRes,
    Product,
    SingleProduct,
    UpdateProduct,
    UpdateProductReq,
    UpdateProductRes
} from '../../../types/productTypes';


// Define a type for the slice state
interface ProductState {
    products: Product[] | null
    totalProducts?: number,
    limit?: number,
    page?: number,
    totalPages?: number,
    pagingCounter?: number,
    hasPrevPage?: boolean,
    hasNextPage?: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    singleProduct?: SingleProduct
}

// create the thunk
export const addProduct = createAsyncThunk(
    'product/add',
    async (productFormData: FormData, { rejectWithValue }) => {
        try {
            const response = await postReq<FormData, AddProductRes>(
                "/api/v1/products/",
                productFormData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response.data
        } catch (error: any) {
            console.log('Error while add product: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getProducts = createAsyncThunk(
    'products/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetProductsRes>("/api/v1/products")
            return response.data
        } catch (error: any) {
            console.log('Error while fetch products: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getProduct = createAsyncThunk(
    'products/product/get',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetProductRes>(`/api/v1/products/${slug}`)
            return response.data
        } catch (error: any) {
            console.log('Error while fetch single product: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const updateProduct = createAsyncThunk(
    'product/update',
    async ({ slug, data }: UpdateProductReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<FormData, UpdateProductRes>(
                `/api/v1/products/${slug}`,
                data,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response.data
        } catch (error: any) {
            console.log('Error while update product: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)


export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response = await deleteReq<DeleteProductRes>(`/api/v1/products/${slug}`)
            return { ...response.data, slug: slug }
        } catch (error: any) {
            console.log('Error while delete product: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

export const deleteProductSubImage = createAsyncThunk(
    'product/subImage-delete',
    async ({ slug, data }: DeleteProductSubImageReq, { rejectWithValue }) => {
        try {
            const response = await patchReq<DeleteProductSubImage, DeleteProductSubImageRes>(
                `/api/v1/products/delete-sub-images/${slug}`,
                data
            )
            return response.data
        } catch (error: any) {
            console.log('Error while delete product sub image: ', error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)




// Define the initial state using that type
const initialState: ProductState = {
    products: [],
    loading: 'idle'
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSingleProduct: (state) => {
            state.singleProduct = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            // add product
            .addCase(addProduct.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(addProduct.rejected, (state) => {
                state.loading = 'failed'
            })
            // get products
            .addCase(getProducts.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.products = payload.data.products
                state.hasNextPage = payload.data.hasNextPage
                state.hasPrevPage = payload.data.hasNextPage
                state.limit = payload.data.limit
                state.page = payload.data.page
                state.pagingCounter = payload.data.pagingCounter
                state.totalPages = payload.data.totalPages
                state.totalProducts = payload.data.totalProducts
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = 'failed'
            })

            // get product
            .addCase(getProduct.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                state.singleProduct = {
                    ...payload.data,
                    subImages: payload.data.subImages.length ? [...payload.data.subImages, payload.data.mainImage] : []
                }
            })
            .addCase(getProduct.rejected, (state) => {
                state.loading = 'failed'
            })

            // delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.products?.length) {
                    const findAddIndex = state.products?.findIndex(product => product.slug === payload.slug)
                    if (findAddIndex !== -1) {
                        state.products?.splice(findAddIndex, 1)
                    }
                }
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.loading = 'failed'
            })

            // update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.singleProduct) {
                    state.singleProduct = { ...state.singleProduct, ...payload.data }
                }
            })
            .addCase(updateProduct.rejected, (state) => {
                state.loading = 'failed'
            })

            // delete product subImage
            .addCase(deleteProductSubImage.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(deleteProductSubImage.fulfilled, (state, { payload }) => {
                state.loading = 'succeeded'
                if (state.singleProduct) {
                    state.singleProduct.subImages = state.singleProduct.subImages.filter(image => image !== payload.data.url)
                }
            })
            .addCase(deleteProductSubImage.rejected, (state) => {
                state.loading = 'failed'
            })
    }

})

export const { clearSingleProduct } = productSlice.actions
export default productSlice.reducer