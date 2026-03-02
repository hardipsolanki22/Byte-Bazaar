import React, { useEffect, useState } from 'react'
import { Checkbox } from '../lightswind/checkbox'
import { Button } from '../lightswind/button'
import { useNavigate } from 'react-router-dom';
import { Label } from '../lightswind/label';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserCart } from '../../features/cart/cartSlice';
import { availablePaymentMethods } from '../../config/constants';
import { createOrder, getUserOrders } from '../../features/order/orderSlice';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import { clearCheckout } from '../../features/checkout/checkoutSlice';

const Payment: React.FC = () => {
    const cartLoading = useAppSelector(({ cart }) => cart.loading)
    const orderLoading = useAppSelector(({ order }) => order.loading)
    const cart = useAppSelector(({ cart }) => cart.cart)
    const checkoutInfo = useAppSelector(({ checkout }) => checkout)
    const dispatch = useAppDispatch()
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart) dispatch(getUserCart())
    }, [dispatch])

    if (!cart && cartLoading === "pending") {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }

    const handlePlaceOrder = () => {
        if (selectedPayment && checkoutInfo.addressId) {
            dispatch(
                createOrder({
                    addressId: checkoutInfo.addressId,
                    paymentType: selectedPayment as "COD" | "STRIPE"
                }))
                .unwrap()
                .then((res) => {
                    dispatch(clearCheckout())
                    if (res.data.url) {
                        window.open(res.data.url)
                        return
                    }
                    dispatch(getUserCart())
                        .unwrap()
                        .then(() => {
                            toast.success(res.message, {
                                position: "top-center"
                            })
                        }).finally(() => {
                            dispatch(getUserOrders())
                                .unwrap()
                                .then(() => {
                                    navigate("/my-orders")
                                })
                        })
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <div>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    <h2 className='sm:text-xl font-semibold text-start'>Select Payment Method</h2>
                    <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                        {/* Payment Method items will go here */}
                        {availablePaymentMethods.map((payment) => (
                            <div
                                key={payment.id}
                                onClick={() => setSelectedPayment(payment.id)}
                                className={`border p-4 rounded-lg cursor-pointer transition-all
            ${selectedPayment === payment.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-slate-200 hover:border-slate-400'
                                    }`}
                            >
                                <div className="flex items-center space-x-2 my-2">
                                    <Checkbox
                                        id={`payment-${payment.id}`}
                                        checked={selectedPayment === payment.id}
                                        onCheckedChange={() => setSelectedPayment(payment.id)}
                                    />
                                    <Label
                                        htmlFor={`payment-${payment.id}`}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        {payment.id === "STRIPE"
                                            ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32" height="32"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <rect width="16" height="16" rx="3" fill="#6772E5" />
                                                    <path
                                                        fill="white"
                                                        d="M6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C9.5 11.868 7.924 13 5.63 13a7.7 7.7 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C4.026 8.49 2.5 7.94 2.5 6.11 2.5 4.165 3.988 3 6.226 3a7.3 7.3 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703"
                                                    />
                                                </svg>
                                            )
                                            : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32" height="32"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <rect width="16" height="16" rx="3" fill="#22c55e" />
                                                    <text
                                                        x="8" y="12"
                                                        textAnchor="middle"
                                                        fill="white"
                                                        fontSize="9"
                                                        fontWeight="bold"
                                                    >₹</text>
                                                </svg>
                                            )
                                        }
                                        {payment.method}
                                    </Label>
                                </div>
                                <p className="text-slate-700 text-sm">{payment.description}</p>

                                {payment.id === "STRIPE" && selectedPayment === "STRIPE" && (
                                    <div className="mt-2 flex items-center gap-1 text-green-600 text-xs">
                                        <span>🔒</span>
                                        <span>Secured by Stripe</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:col-span-4 p-4 border-l border-slate-200 '>
                    <h2 className='sm:text-xl font-semibold mb-4'>Price Details</h2>
                    <div className='flex flex-col gap-4 p-4 border-b border-slate-200 '>
                        <div className='flex items-start mx-4 justify-between'>
                            <p className='text-slate-700 font-medium'>Total Products Price:</p>
                            <span className='font-medium text-slate-700'>+ ₹{cart?.cartTotal}</span>
                        </div>
                        <div className='flex items-start mx-4 justify-between'>
                            <p className='text-green-600 font-medium'>Total Discount:</p>
                            <span className='text-green-600 font-medium'> - ₹{cart?.discountValue}</span>
                        </div>
                    </div>
                    <div className='p-4 flex items-start mx-4 justify-between'>
                        <p className='sm:text-xl font-semibold'>Total Price:</p>
                        <span className='font-semibold text-slate-700'>₹ {cart?.discountedTotal}</span>
                    </div>
                    {!!cart?.discountValue &&
                        <div className='p-4 mx-4 bg-green-400 rounded-lg'>
                            <p className='text-white font-medium'>You saved ₹{cart.discountValue} on this order!</p>
                        </div>
                    }
                    <Button
                        disabled={!selectedPayment || orderLoading === "pending"}
                        onClick={handlePlaceOrder}
                        className='w-full mt-6 cursor-pointer'>
                        {orderLoading === "pending" || cartLoading === "pending" ?
                            <Spinner data-icon="inline-start" />
                            : "Place Order"
                        }
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Payment
