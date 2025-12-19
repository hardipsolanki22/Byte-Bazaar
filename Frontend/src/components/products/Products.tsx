import React from 'react'

const Products: React.FC = () =>  {
  return (
    <div>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl'>Products </h1>
        <div className='grid m-4 gap-4 col-span-1 sm:grid-cols-12 h-20'>
            <div className='sm:col-span-3 bg-white'>

            </div>
            <div className='sm:col-span-9 bg-red-500'>

            </div>
        </div>

      
    </div>
  )
}

export default Products
