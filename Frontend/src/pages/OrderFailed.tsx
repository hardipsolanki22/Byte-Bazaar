import { useNavigate } from "react-router-dom"
import { Button } from "../components/lightswind/button"

// OrderFailed.tsx
const OrderFailed = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-4'>
            {/* Error Animation/Circle */}
            <div className='relative mb-6'>
                <div className='absolute inset-0 rounded-full bg-red-500/20 animate-ping' />
                <div className='relative flex items-center justify-center w-24 h-24 bg-gradient-to-br
         from-red-500 to-rose-500 rounded-full shadow-lg shadow-red-500/30'>
                    <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </div>
            </div>

            {/* Error Message */}
            <div className='text-center max-w-md mx-auto'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600
         bg-clip-text text-transparent mb-2'>
                    Payment Failed!
                </h1>
                <p className='text-slate-500 text-lg mb-2'>
                    Your order was not placed
                </p>
                <div className='bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4'>
                    <p className='text-sm text-amber-700 flex items-center justify-center gap-2'>
                        <span>⚠️</span>
                        This could be due to insufficient funds or incorrect payment details
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 mt-8'>
                <Button
                    onClick={() => navigate('/checkout/payment')}
                    className='bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600
             hover:to-rose-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg 
             shadow-red-500/30 transition-all
              duration-200 hover:scale-105 cursor-pointer'
                >
                    Try Again
                </Button>
                <Button
                    onClick={() => navigate('/checkout/cart')}
                    variant='outline'
                    className='border-2 border-slate-200 hover:border-slate-300 text-slate-600 
            px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 cursor-pointer'
                >
                    View Cart
                </Button>
            </div>


        </div>
    )
}

export default OrderFailed