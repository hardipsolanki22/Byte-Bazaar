import React, { useEffect } from 'react'
import { Button } from '../../../components/lightswind/button'
import { LocationEdit, Pencil } from 'lucide-react'
import { Badge } from '../../../components/lightswind/badge'
import { Avatar, AvatarImage } from '../../../components/lightswind/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/lightswind/popover'
import UpdatePaymentAndOrderStatus from '../../../components/admin/UpdatePaymentAndOrderStatus'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useParams } from 'react-router-dom'
import { getSingleOrder } from '../../../features/order/orderSlice'
import { OrderDetailSkeleton } from '../../../components/skeleton/singleOrderSkeleton'

const SingleOrder: React.FC = () => {
   
    const { orderId } = useParams()
    if (!orderId) return
    const loading = useAppSelector(({ order }) => order.loading)
    const singleOrder = useAppSelector(({ order }) => order.singleOrder)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSingleOrder(orderId))
    }, [dispatch, orderId])

    if (!singleOrder && loading === "pending" || loading === "idle") {
        return <OrderDetailSkeleton />
        
    }
    if (!singleOrder) {
        return (
            <div className='w-full flex items-center justify-center text-center h-full'>
                <h2 className='text-2xl text-slate-600 font-semibold'>
                    Order Not Found
                </h2>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4 m-2 p-4 w-full'>
            <div className='w-full flex flex-col sm:flex-row mx-2  space-y-2'>
                <div className='flex flex-col sm:flex-row space-y-2  sm:text-lg 
                items-end justify-center font-semibold w-full'>
                    <div className='flex flex-col md:flex-row md:justify-between justify-start w-full gap-2 my-2'>
                        <div className='flex flex-col md:flex-row gap-4 '>
                            <div className='flex gap-4'>
                                <p>Order ID: </p> <span>#{singleOrder?._id}</span>
                            </div>
                            <div className='flex  gap-2'>
                                {singleOrder.status === "PENDING" && <Badge variant={'warning'}>
                                    PENDING
                                </Badge>}
                                {singleOrder.status === "DELIVERED" && <Badge variant={'success'}>
                                    DELIVERED
                                </Badge>}
                                {singleOrder.status === "CANCELLED" && <Badge variant={'destructive'}>
                                    CANCELLED
                                </Badge>}
                            </div>
                        </div>
                    </div>
                    <Popover closeOnOutsideClick={false}>
                        <PopoverTrigger asChild>
                            <Button variant='github' className='cursor-pointer'>
                                Edit_
                                <Pencil height={20} width={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <UpdatePaymentAndOrderStatus
                                orderId={orderId}
                                ispaymentdone={singleOrder.isPaymentDone ? "Paid" : "Unpaid"}
                                status={singleOrder.status}
                            />
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    <h2 className='sm:text-xl font-semibold text-start'>Products Details</h2>
                    <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                        {/* Product items will go here */}
                        {singleOrder?.order.map(({ product, quantity }) => (
                            <div key={product._id} className='flex flex-col gap-4
                    border border-slate-200 rounded-lg p-4'>
                                <div className='flex flex-col lg:flex-row'>
                                    <div className='flex justify-center gap-3'>
                                        <img src={product.mainImage} alt={product.name} className='rounded-lg w-24 h-24 object-cover mr-4' />
                                        <div className='flex flex-col m-2'>
                                            <h2 className='text-lg font-semibold inline-block sm:hidden'>
                                                {product.name.substring(0, 30)}{product.name.length > 30 ? '...' : ''}
                                            </h2>
                                            <h2 className='text-lg font-semibold hidden sm:inline-block'>{product.name}</h2>
                                            <p className='text-gray-600'>Quantity: {quantity}</p>
                                            <p className='text-lg'>Price: ₹{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:col-span-4 border-t sm:border-l border-slate-200 p-2 '>
                    <div className='border-b border-slate-200 mb-4'>
                        <p className='sm:text-xl font-semibold mb-4 mt-2'>Customer Details</p>
                        <div className='flex flex-col items-center justify-center my-2 gap-2 w-full p-4'>
                            <div className='flex gap-4'>
                                <Avatar>
                                    <AvatarImage
                                        src={singleOrder.user.avatar}
                                        alt={singleOrder.user.fullName}
                                    />
                                </Avatar>
                                <p className='font-semibold sm:text-lg'>{singleOrder.user.fullName}</p>
                            </div>
                            <div className=' flex items-center justify-center flex-col'>
                                <p className='text-slate-400'>{singleOrder.user.email}</p>
                                <p className='text-slate-400'>{singleOrder.user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div>
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
                                <p className='text-slate-700 font-medium'>Cart Total:</p>
                                <span className='font-semibold text-slate-700'>₹{singleOrder.cartTotal}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-slate-700 font-medium'>Discount Applied:</p>
                                <span className='font-semibold text-green-600'>₹{singleOrder.discountValue}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-slate-700 font-medium'>Order Price:</p>
                                <span className='font-semibold text-slate-700'>₹{singleOrder.orderPrice}</span>
                            </div>
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
            <div className='p-4 mt-4 border-t md:border border-slate-200 rounded-md w-full'>
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
