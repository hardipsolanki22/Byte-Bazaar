import React from 'react'
import CouponForm from '../../../components/admin/CouponForm'

const AddCoupon: React.FC = () => {
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-auto'>
                <CouponForm />
            </div>
        </div>
    )
}

export default AddCoupon
