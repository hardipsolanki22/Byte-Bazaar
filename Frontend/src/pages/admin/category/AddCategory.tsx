import React from 'react'
import CategoryForm from '../../../components/admin/CategoryForm'

const AddCategory = () => {
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-full sm:w-md'>
                <CategoryForm />
            </div>
        </div>
    )
}

export default AddCategory
