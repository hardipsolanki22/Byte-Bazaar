import { Star } from 'lucide-react';
import React from 'react'

type ProductProps = {
    name: string;
    price: number;
    mainImage: string;
    averageRating: number;
    ratingCount: number;
    slug: string;
}

const Product = ({
    name: productName,
    price: productPrice,
    mainImage: productMainImage,
    averageRating: productAverageRating,
    ratingCount: productRatingCount,
    slug: productSlug,
    ...product
}: ProductProps) => {
    return (
        <div className='border border-slate-400 rounded-md p-4'>
            <img src={productMainImage} alt={productName}
                className='w-full h-48 object-cover mb-4 rounded-md' />
            <h3 className='text-lg font-semibold text-slate-600'>{productName}</h3>
            <p className='text-slate-800 font-bold mt-2'>${productPrice}</p>
            <div className='flex items-center mt-2'>
                <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1 mr-1'>
                    <span className='text-white'>
                        {productAverageRating}
                    </span>
                    <Star size={16} color='white' />
                </div>
                <span className='text-slate-600'>{productRatingCount} reviews</span>
            </div>
        </div>
    )
}

export default Product
