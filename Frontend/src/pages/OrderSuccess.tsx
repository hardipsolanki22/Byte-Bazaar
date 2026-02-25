import { useEffect } from "react"
import { useAppDispatch } from "../app/hooks"
import { clearCheckout } from "../features/checkout/checkoutSlice"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/lightswind/button"
import { getUserCart } from "../features/cart/cartSlice"

const OrderSuccess = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearCheckout())
        dispatch(getUserCart())
    }, [])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-4 '>
            {/* Success Animation/Circle */}
            <div className='relative mb-6'>
                <div className='absolute inset-0 rounded-full bg-green-500/20 animate-ping' />
                <div className='relative flex items-center justify-center w-24 h-24 bg-gradient-to-br
                 from-green-500 to-emerald-500 rounded-full shadow-lg shadow-green-500/30'>
                    <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                    </svg>
                </div>
            </div>

            {/* Success Message */}
            <div className='text-center max-w-md mx-auto'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 
                bg-clip-text text-transparent mb-2'>
                    Order Confirmed!
                </h1>
                <p className='text-slate-500 text-lg mb-2'>
                    Thank you for your purchase
                </p>
                <p className='text-sm text-slate-400 border-t border-slate-200 pt-4 mt-4'>
                    We'll send you shipping updates via email
                </p>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 mt-8'>
                <Button
                    onClick={() => navigate('/my-orders')}
                    className='bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700
                     hover:to-slate-600 text-white cursor-pointer
                    px-8 py-3 rounded-xl font-medium shadow-lg shadow-slate-200 transition-all duration-200 hover:scale-105'
                >
                    View Orders
                </Button>
                <Button
                    onClick={() => navigate('/')}
                    variant='outline'
                    className='border-2 border-slate-200 hover:border-slate-300 text-slate-600 px-8 py-3
                     rounded-xl font-medium transition-all duration-200 hover:scale-105 cursor-pointer'
                >
                    Continue Shopping
                </Button>
            </div>
        </div>
    )
}

export default OrderSuccess