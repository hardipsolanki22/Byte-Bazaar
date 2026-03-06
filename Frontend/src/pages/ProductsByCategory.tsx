import React, { useEffect } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProductsByCategory } from '../features/product/productSlice';
import Product from '../components/products/Product';
import ProductNotFoundWithText from '../assets/ProductNotFound';

const ProductsByCategory = () => {
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    if (!category) {
        return <Navigate to='/' replace />
    }
    const productLoading = useAppSelector(({ product }) => product.loading)
    const products = useAppSelector(({ product }) => product.products)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getProductsByCategory(category))
        return
    }, [category, dispatch])

    if (productLoading === "pending" || productLoading === "idle") {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }
    if (!products?.length) {
        return (
            <div className='w-full flex items-center justify-center text-center h-full'>
                <ProductNotFoundWithText />
            </div>
        )
    }

    return (
        <div className='min-h-screen w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch'>
                {products?.map((product, index) => (
                    <Link key={index} to={`/products/${product.slug}`}
                        className='h-full'
                    >
                        <Product {...product} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProductsByCategory
