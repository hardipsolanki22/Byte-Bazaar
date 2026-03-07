import React, { useEffect } from 'react'
import { TruckElectricIcon, Package, GiftIcon, LocationEdit } from "lucide-react"
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getUserSingleOrder } from '../../features/order/orderSlice'
import emptyOrders from "../../assets/svg/empty-orders.svg"
import { OrderDetailSkeleton } from '../skeleton/singleOrderSkeleton'

<img src={emptyOrders} alt="No orders" className="w-48 sm:w-64 md:w-72" />
const SingleOrder: React.FC = () => {
    const { orderId } = useParams()
    if (!orderId) return
    const loading = useAppSelector(({ order }) => order.loading)
    const singleOrder = useAppSelector(({ order }) => order.userSingleOrder)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserSingleOrder(orderId))
    }, [dispatch, orderId])

    if (!singleOrder && (loading === "pending" || loading === "idle")) {
        return <OrderDetailSkeleton />
    }
    if (!singleOrder) {
        return (
            <div className='w-full flex items-center justify-center text-center min-h-screen px-4'>
                <img src={emptyOrders} alt="No orders" className="w-48 sm:w-64 md:w-72" />
            </div>
        )
    }


    return (
        <div className='flex flex-col justify-center my-4'>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    <h2 className='sm:text-xl font-semibold text-start'>Products Details</h2>
                    <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                        <h2 className='text-lg font-semibold'>
                            Order: #{singleOrder._id}
                        </h2>

                        {/* Product items will go here */}
                        {singleOrder.order.map(({ product, quantity }) => (
                            <div key={product._id} className='flex flex-col gap-4
                    border border-slate-200 rounded-lg p-4'>
                                <div className='flex flex-col lg:flex-row'>
                                    <div className='flex justify-center gap-3'>
                                        <img src={product.mainImage} alt={product.name} className='rounded-lg w-24 h-24 object-cover mr-4' />
                                        <div className='flex flex-col m-2'>
                                            <h2 className='text-lg font-semibold inline-block sm:hidden'>
                                                {product.name.substring(0, 20)}{product.name.length > 20 ? '...' : ''}
                                            </h2>
                                            <h2 className='text-lg font-semibold hidden sm:inline-block break-words line-clamp-2'>
                                                {product.name.substring(0, 50)}{product.name.length > 50 ? '...' : ''}
                                            </h2>

                                            <p className='text-gray-600'>Quantity: {quantity}</p>
                                            <p className='text-lg'>Price: ₹{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:col-span-4 p-4 border-l border-slate-200 '>
                    <h2 className='sm:text-xl font-semibold mb-4'>Payment & Order Details</h2>
                    <div className='flex flex-col gap-4 p-4'>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Payment Status:</p>
                            <span className={`font-semibold ${singleOrder.isPaymentDone ? 'text-green-600' : 'text-red-600'}`}>
                                {singleOrder.isPaymentDone ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Payment Method:</p>
                            <span className='font-semibold text-slate-700'>{singleOrder.paymentType}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Order Price:</p>
                            <span className='font-semibold text-slate-700'>₹{singleOrder.orderPrice}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Cart Total:</p>
                            <span className='font-semibold text-slate-700'>₹{singleOrder.cartTotal}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Discount Applied:</p>
                            <span className='font-semibold text-green-600'>₹{singleOrder.discountValue}</span>
                        </div>
                    </div>
                    {singleOrder.coupon && <div className='border-t border-slate-200 p-2'>
                        <h2 className='sm:text-xl font-semibold mb-4'>Coupon Details</h2>
                        <div className='flex flex-col gap-4 p-4'>
                            <div className='flex items-center justify-between'>
                                <p className='text-slate-700 font-medium'>Coupon Code</p>
                                <span className='font-semibold text-slate-700'>{singleOrder.coupon.couponCode}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-slate-700 font-medium'>Cart Total:</p>
                                <span className='font-semibold text-slate-700'>{singleOrder.coupon.discountPercentage}%</span>
                            </div>
                        </div>
                    </div>}
                </div>

            </div>


            <div className='p-4 mt-4 border border-slate-200 rounded-md w-full'>
                <div className='flex gap-4 flex-col '>
                    <div className='flex items-center gap-4'>
                        {singleOrder.status === "DELIVERED" && <Package width={30} hanging={30} color='green' />}
                        {singleOrder.status === "CANCELLED" && <Package width={30} hanging={30} color='red' />}
                        {singleOrder.status === "PENDING" && <TruckElectricIcon width={30} hanging={30} color='orange' />}
                        <div>
                            <h2 className='sm:text-xl font-semibold text-start'>{singleOrder.status}</h2>
                            <p className='text-slate-600'>The , 17 Dec</p>
                        </div>
                    </div>
                    {singleOrder.status === "DELIVERED" && (
                        <div className='p-2 sm:p-4 mx-4 bg-green-400 rounded-lg w-fit flex gap-2 items-center'>
                            <GiftIcon width={25} hanging={25} color='white' />
                            <p className='text-white font-medium'>
                                Yay! Your order reached on time.
                            </p>
                        </div>
                    )}

                    {singleOrder.status === "PENDING" && (
                        <div className='p-2 sm:p-4 mx-4 bg-yellow-400 rounded-lg w-fit flex gap-2 items-center'>
                            <TruckElectricIcon width={25} hanging={25} color='white' />
                            <p className='text-white font-medium'>
                                Your order is pending and will be processed soon.
                            </p>
                        </div>
                    )}

                    {singleOrder.status === "CANCELLED" && (
                        <div className='p-2 sm:p-4 mx-4 bg-red-400 rounded-lg w-fit flex gap-2 items-center'>
                            <Package width={25} hanging={25} color='white' />
                            <p className='text-white font-medium'>
                                We're sorry — this order was cancelled.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className='p-4 mt-4 border border-slate-200 rounded-md w-full'>
                <div className='flex items-center'>
                    <LocationEdit width={25} height={25} className='mx-4' color='maroon' />
                    <h2 className='sm:text-xl font-semibold text-start'>Delivered Location</h2>
                </div>
                <div className='flex items-center space-x-2 p-2'>
                    <p className="text-slate-700">{singleOrder.address.addressLine}</p>
                    <p className="text-slate-700">{singleOrder.address.city},
                        {singleOrder.address.state}, {singleOrder.address.country} - {singleOrder.address.pincode}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder
