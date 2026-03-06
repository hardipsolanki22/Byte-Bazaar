import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/lightswind/select'
import Product from '../../../components/products/Product'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { clearSingleProduct, getProducts, getProductsByCategory } from '../../../features/product/productSlice'
import { getCategories } from '../../../features/category/categorySlice'
import ProductByCategorySkeleton from '../../../components/skeleton/productByCategory'

const Products: React.FC = () => {
    const productLoading = useAppSelector(({ product }) => product.loading)
    const products = useAppSelector(({ product }) => product.products)
    const productRoot = useAppSelector(({ product }) => product)
    const categories = useAppSelector(({ category }) => category.catagories)
    const categoriesLoading = useAppSelector(({ category }) => category.loading)
    const [categoryTobeSelected, SetCategoryTobeSelect] = useState<string>("")

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!products?.length || !categories?.length) {
            Promise.all([
                dispatch(getProducts()),
                dispatch(getCategories())
            ])
        }
        dispatch(clearSingleProduct())
        return
    }, [dispatch])

    useEffect(() => {
        if (categoryTobeSelected) {
            dispatch(getProductsByCategory(categoryTobeSelected))
        }
        return
    }, [categoryTobeSelected])

    if (productLoading === "pending" || productLoading === "idle" || categoriesLoading === "pending") {
        return (
            <div className='w-full h-full'>
                <ProductByCategorySkeleton />
            </div>
        )
    }

    return (
        <div className='w-full'>
            {!products?.length ? (
                <div className='w-full h-full grid m-2 gap-4 grid-cols-span-1 lg:grid-cols-12'>
                    <div className='lg:col-span-3 bg-white p-4 border border-slate-400 rounded-md'>
                        <div className='border-b border-slate-400 pb-3 text-left'>
                            <h3 className='text-xl'>Filters</h3>
                            <p className='text-slate-400'>{productRoot.totalProducts} Products</p>
                        </div>
                        <div className='py-3 text-left'>
                            <h2 className='text-xl'>Category</h2>
                            <Select
                                value={categoryTobeSelected}
                                onValueChange={(value) => SetCategoryTobeSelect(value)}
                            >
                                <SelectTrigger className="w-full mt-4">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((category) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category.slug}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='lg:col-span-9 p-4 h-full flex items-center justify-center'>
                        <h2 className='text-2xl text-slate-600 font-semibold'>
                            Products Not Found
                        </h2>
                    </div>
                </div>
            ) : (
                <div className='w-full'>
                    <div className='grid m-2 gap-4 grid-cols-span-1 lg:grid-cols-12 min-h-screen'>
                        <div className='lg:col-span-3 bg-white p-4 border border-slate-400 rounded-md'>
                            <div className='border-b border-slate-400 pb-3 text-left'>
                                <h3 className='text-xl'>Filters</h3>
                                <p className='text-slate-400'>{productRoot.totalProducts} Products</p>
                            </div>
                            <div className='py-3 text-left'>
                                <h2 className='text-xl'>Category</h2>
                                <Select
                                    value={categoryTobeSelected}
                                    onValueChange={(value) => SetCategoryTobeSelect(value)}
                                >
                                    <SelectTrigger className="w-full mt-4">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem
                                                key={category._id}
                                                value={category.slug}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='lg:col-span-9 bg-white p-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch'>
                                {products?.map((product, index) => (
                                    <Link key={index} to={`/admin/products/${product.slug}`}
                                        className='h-full'
                                    >
                                        <Product {...product} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Products
