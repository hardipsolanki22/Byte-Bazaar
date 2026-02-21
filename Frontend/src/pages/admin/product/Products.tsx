import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/lightswind/select'
import Product from '../../../components/products/Product'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../../components/lightswind/pagination'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { clearSingleProduct, getProducts } from '../../../features/admin/product/productSlice'

const Products: React.FC = () => {
    const productLoading = useAppSelector(({ product }) => product.loading)
    const products = useAppSelector(({ product }) => product.products)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!products?.length) {
            dispatch(getProducts())
        }
        dispatch(clearSingleProduct())
        return
    }, [dispatch])

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
                <h2 className='text-2xl text-slate-600 font-semibold'>
                    Products Not Found
                </h2>
            </div>
        )
    }

    return (
        <div className='w-full'>
            <div className='grid m-2 gap-4 grid-cols-span-1 lg:grid-cols-12'>
                <div className='lg:col-span-3 bg-white p-4 border border-slate-400 rounded-md'>
                    <div className='border-b border-slate-400 pb-3 text-left'>
                        <h3 className='text-xl'>Filters</h3>
                        <p className='text-slate-400'>1000+ Products</p>
                    </div>
                    <div className='py-3 text-left'>
                        <h2 className='text-xl'>Category</h2>
                        <Select>
                            <SelectTrigger className="w-full mt-4">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Smart Mobile">Smart Mobiles</SelectItem>
                                <SelectItem value="Smart Watches">Smart Watches</SelectItem>
                                <SelectItem value="Cameras">Cameras</SelectItem>
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
            <div className='my-4 sm:mt-10 flex items-center justify-center w-full '>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">5</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default Products
