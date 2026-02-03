import React from 'react'
import ProductForm from '../../components/admin/ProductForm'

const AddProduct: React.FC = () => {
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-auto'>
                <ProductForm />
            </div>
        </div>
    )
}

export default AddProduct
