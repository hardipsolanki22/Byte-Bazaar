import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getCoupons } from '../../../features/admin/coupon/couponSlice';
import CategoryForm from '../../../components/admin/CategoryForm';
import CouponForm from '../../../components/admin/CouponForm';

const UpdateCoupon = () => {
    // dispath that perticular category if admin refresh the page and give to form
    const { couponId } = useParams();
    if (!couponId) return
    const loading = useAppSelector(({ coupon }) => coupon.loading)
    const coupons = useAppSelector(({ coupon }) => coupon.coupons)
    const coupon = coupons?.find(ctg => ctg._id === couponId)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!coupons?.length) {
            dispatch(getCoupons())
        }
    }, [dispatch])

    return loading === "pending" && !!!coupons?.length ? (
        <div className='flex items-center  w-full justify-center h-full'>
            <h1>Loading...</h1>
        </div>
    ) : (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-full sm:w-md'>
                <CouponForm
                    {...coupon}
                />
            </div>
        </div>
    )
}

export default UpdateCoupon
