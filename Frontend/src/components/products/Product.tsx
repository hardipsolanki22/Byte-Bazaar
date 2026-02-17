import { Star } from 'lucide-react';
import React from 'react'

type ProductProps = {
    name: string;
    price: number;
    mainImage: string;
    averageRating?: number;
    ratingCount?: number;
    slug: string;
}

const Product = ({
    name,
    price,
    mainImage,
    averageRating,
    ratingCount,
    slug,
    ...product
}: ProductProps) => {
    return (
        <div className='border border-slate-400 rounded-md p-4 h-full'>
            <img
                src={mainImage}
                alt={name}
                className='w-full h-48 object-cover mb-4 rounded-md'
            />
            <div className='flex flex-col flex-grow'>
                <h3 className='text-lg font-semibold text-slate-600'>{name}</h3>
                <p className='text-slate-800 font-bold mt-2'>${price}</p>
                {averageRating && ratingCount &&
                    <div className='flex items-center mt-2'>
                        <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1 mr-1'>
                            <span className='text-white'>
                                {averageRating}
                            </span>
                            <Star size={16} color='white' />
                        </div>
                        <span className='text-slate-600'>{ratingCount} reviews</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Product
