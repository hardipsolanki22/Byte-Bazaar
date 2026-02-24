import React from 'react'
import HeroBannerForm from '../../../components/admin/HeroBannerForm'

const AddHeroBanner = () => {
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-auto'>
                <HeroBannerForm />
            </div>
        </div>
    )
}

export default AddHeroBanner
