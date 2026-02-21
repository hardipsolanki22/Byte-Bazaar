import React, { useEffect } from 'react'
import ProductForm from '../../../components/admin/ProductForm'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getProduct } from '../../../features/admin/product/productSlice';

const UpdateProduct = () => {

    // dispath that perticular category if admin refresh the page and give to form
    const { slug } = useParams();
    if (!slug) return
    const loading = useAppSelector(({ product }) => product.loading)
    const product = useAppSelector(({ product }) => product.singleProduct)
    const categoryInitLoading = useAppSelector(({ category }) => category.loading)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!product) {
            dispatch(getProduct(slug))
        }
    }, [dispatch, slug])

    if (!product && loading == "pending" || categoryInitLoading === "pending") {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-auto'>
                <ProductForm
                    {...product}
                    subImages={product?.subImages.length ? product.subImages.slice(0, product.subImages.length - 1) : []}
                />
            </div >
        </div >
    )
}

export default UpdateProduct
