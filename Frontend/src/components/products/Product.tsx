import { DivideCircle, Star } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom';
import { Button } from '../lightswind/button';

const Product: React.FC = () => {

  const { slug } = useParams();

  const product = {
    name: 'iPhone 13',
    price: 999,
    mainImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
    averageRating: 4.5,
    ratingCount: 120,
    stock: 10,
    description: 'The iPhone 13 features a sleek design, powerful A15 Bionic chip, and an advanced dual-camera system for stunning photos and videos.',
    subImages: [
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D'
    ]
  }
  console.log(slug)
  return (
    <div className=' pt-4 justify-center items-center'>
      <div className=' rounded-md p-4 m-4 
      grid grid-cols-1 lg:grid-cols-12  gap-4'>
        <div className='lg:col-span-6'>
          <div className='flex sm:flex-row flex-col-reverse justify-center gap-6'>
            <div className='flex sm:flex-col items-center flex-wrap justify-center sm:justify-normal gap-4 sm:mt-4'>
              {product.subImages.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Product ${idx + 1}`}
                  className='w-16 h-16 sm:h-20 sm:w-20  object-cover rounded-md hover:scale-105 transition-transform
                     cursor-pointer'
                />
              ))}
            </div>
            <div className='px-4 sm:px-10 border rounded-sm border-slate-400'>
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-[30rem] h-[30rem] object-cover"
              />
            </div>
          </div>
        </div>
        <div className='lg:col-span-6 lg:max-h-screen lg:overflow-y-auto'>
          <div className='flex flex-col-reverse lg:flex-col mb-4 border-b border-slate-300 sm:border-none'>
            <div className='flex flex-col justify-center p-4 rounded-md sm:border border-slate-200'>
              <h2 className='text-3xl text-slate-700 font-bold mb-2 '>{product.name}</h2>
              <p className='text-slate-600 mb-2'>{product.description}</p>
              <p className='text-xl font-semibold mb-2 text-slate-700'>${product.price}</p>
              <div className='flex items-center mb-2'>
                <span className='text-slate-700 mr-2'>Stock:</span>
                <span className={`font-medium ${product.stock > 5 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 5 ? 'In Stock' : 'Low Stock'}
                </span>
              </div>
              <div className='flex items-center'>
                <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1 mr-2'>
                  <Star className='w-4 h-4 fill-white text-white' />
                  <span className='text-white font-medium'>{product.averageRating}</span>
                </div>
                <span className='text-slate-500'>({product.ratingCount} reviews)</span>
              </div>
            </div>
            <div className='flex gap-4 justify-evenly my-4 items-center sm:rounded-md  
            border-y border-slate-300 sm:border  sm:border-slate-200 p-4 sm:p-2'>
              <Button variant='secondary' className='w-72 cursor-pointer'>
                Add To Cart
              </Button>
              <Button className='w-72 cursor-pointer'>
                Buy Now
              </Button>

            </div>
          </div>
          <div className='sm:border rounded-md border-slate-200 p-4 flex sm:items-start
         flex-col'>
            <div className='border-b pb-4 sm:w-full border-slate-300 '>
              <h2 className='sm:text-xl font-semibold '>
                Product Ratings & Reviews
              </h2>
              <div className='flex items-center flex-col sm:flex-row justify-around m-4'>
                <div className='flex flex-col items-center justify-center mb-4 sm:mb-0'>
                  <div className='flex items-center justify-center my-2'>
                    <h2 className='text-xl sm:text-4xl font-semibold mt-2'>4.2</h2>
                    <Star className='w-5 h-5 fill-yellow-400 text-yellow-400 ml-1' />
                  </div>
                  <p className='text-slate-400 text-sm'>3659  Ratings,</p>
                  <p className='text-slate-400 text-sm'>2473  Reviews</p>
                </div>
                <div className='flex items-center'>
                  <DivideCircle className='w-1 h-32 ml-4 text-slate-300' />
                  <div>
                    <div className='flex items-center gap-2 my-1'>
                      <span className='text-sm text-slate-500 w-16'>Excellent</span>
                      <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                        <div className='h-4 bg-green-500 rounded-full' style={{ width: '70%' }}></div>
                      </div>
                      <span className='text-sm text-slate-500 w-8 text-right'>70%</span>
                    </div>
                    <div className='flex items-center gap-2 my-1'>
                      <span className='text-sm text-slate-500 w-16'>Good</span>
                      <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                        <div className='h-4 bg-blue-500 rounded-full' style={{ width: '50%' }}></div>
                      </div>
                      <span className='text-sm text-slate-500 w-8 text-right'>50%</span>
                    </div>
                    <div className='flex items-center gap-2 my-1'>
                      <span className='text-sm text-slate-500 w-16'>Average</span>
                      <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                        <div className='h-4 bg-yellow-500 rounded-full' style={{ width: '30%' }}></div>
                      </div>
                      <span className='text-sm text-slate-500 w-8 text-right'>30%</span>
                    </div>
                    <div className='flex items-center gap-2 my-1'>
                      <span className='text-sm text-slate-500 w-16'>Poor</span>
                      <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                        <div className='h-4 bg-orange-500 rounded-full' style={{ width: '15%' }}></div>
                      </div>
                      <span className='text-sm text-slate-500 w-8 text-right'>15%</span>
                    </div>
                    <div className='flex items-center gap-2 my-1'>
                      <span className='text-sm text-slate-500 w-16'>Terrible</span>
                      <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                        <div className='h-4 bg-red-500 rounded-full' style={{ width: '5%' }}></div>
                      </div>
                      <span className='text-sm text-slate-500 w-8 text-right'>5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 flex items-start flex-col border-b border-slate-300 pb-4 w-full'>
              <div className='flex items-center gap-4 '>
                <img src="" alt="user avatar" className="w-10 h-10 rounded-full" />
                <h3 className='text-slate-400 text-sm'>
                  John Doe
                </h3>
              </div>
              <div className='m-3 rounded-lg flex items-center gap-2'>
                <div className='flex items-center mt-2'>
                  <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1'>
                    <span className='text-white'>
                      {product.averageRating}
                    </span>
                    <Star size={16} color='white' />
                  </div>
                </div>
                <div className='bg-slate-400 rounded-full p-[2px]'></div>
                <span className='text-slate-400 text-sm'>Posted on 14 Oct 2025</span>

              </div>
              <p className='mt-2 text-slate-600'>
                This product is amazing! I highly recommend it.
              </p>
            </div>
            <div className='mt-4 flex items-start flex-col'>
              <div className='flex items-center gap-4 '>
                <img src="" alt="user avatar" className="w-10 h-10 rounded-full" />
                <h3 className='text-slate-400 text-sm'>
                  John Doe
                </h3>
              </div>
              <div className='m-3 rounded-lg flex items-center gap-2'>
                <div className='flex items-center mt-2'>
                  <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1'>
                    <span className='text-white'>
                      {product.averageRating}
                    </span>
                    <Star size={16} color='white' />
                  </div>
                </div>
                <div className='bg-slate-400 rounded-full p-[2px]'></div>
                <span className='text-slate-400 text-sm'>Posted on 14 Oct 2025</span>

              </div>
              <p className='mt-2 text-slate-600'>
                This product is amazing! I highly recommend it.
              </p>
            </div>
            <div className='mt-4 flex items-start flex-col'>
              <div className='flex items-center gap-4 '>
                <img src="" alt="user avatar" className="w-10 h-10 rounded-full" />
                <h3 className='text-slate-400 text-sm'>
                  John Doe
                </h3>
              </div>
              <div className='m-3 rounded-lg flex items-center gap-2'>
                <div className='flex items-center mt-2'>
                  <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1'>
                    <span className='text-white'>
                      {product.averageRating}
                    </span>
                    <Star size={16} color='white' />
                  </div>
                </div>
                <div className='bg-slate-400 rounded-full p-[2px]'></div>
                <span className='text-slate-400 text-sm'>Posted on 14 Oct 2025</span>

              </div>
              <p className='mt-2 text-slate-600'>
                This product is amazing! I highly recommend it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
