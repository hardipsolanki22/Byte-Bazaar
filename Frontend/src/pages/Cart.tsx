import React, { useEffect } from 'react'
import { Button } from '../components/lightswind/button'
import { Popover, PopoverContent, PopoverTrigger } from '../components/lightswind/popover'
import UpdateCartItemQty from '../components/cart/Cart'
import { Input } from '../components/lightswind/input'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getUserCart, removeItemFromCart } from '../features/cart/cartSlice'
import { toast } from 'sonner'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { applyCoupon } from '../features/coupon/couponSlice'

type Input = {
    couponCode: string;
}
const Cart: React.FC = () => {

    const loading = useAppSelector(({ cart }) => cart.loading)
    const couponLoading = useAppSelector(({ coupon }) => coupon.loading)
    const cart = useAppSelector(({ cart }) => cart.cart)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Input>()

    useEffect(() => {
        if (!cart) dispatch(getUserCart())
    }, [dispatch])

    if (!cart && loading === "pending" || loading === "idle") {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }
    if (!cart?.items.length) {
        return (
            <div className='w-full flex items-center justify-center text-center min-h-screen'>
                <h2 className='text-2xl text-slate-600 font-semibold'>
                    Cart is empty
                </h2>
            </div>
        )
    }

    const handleremoveItemFromCart = (slug: string) => {
        dispatch(removeItemFromCart(slug))
            .unwrap()
            .then((data) => {
                dispatch(getUserCart())
                    .unwrap()
                    .then(() => {
                        toast.success(data.message, {
                            position: "top-center"
                        })
                    })
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center"

                })
            })
    }
    const onSubmit: SubmitHandler<Input> = (data) => {
        dispatch(applyCoupon(data.couponCode))
            .unwrap()
            .then((couponData) => {
                dispatch(getUserCart())
                    .unwrap()
                    .then(() => {
                        toast.success(couponData.message, {
                            position: "top-center"
                        })
                    })
                reset()
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    duration: 5000
                })
            })
    }


    return (
        <div className='flex flex-col md:flex-row items-center justify-center'>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    <h2 className='sm:text-xl font-semibold text-start'>Products Details</h2>
                    <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                        {/* Product items will go here */}
                        {cart.items.map((item) => (
                            <div
                                key={item.product._id}
                                className='flex flex-col gap-4
                    border border-slate-200 rounded-lg p-4'>
                                <div className='flex flex-col lg:flex-row justify-between'>
                                    <Link to={`/products/${item.product.slug}`}>
                                        <div className='flex justify-center gap-3'>
                                            <img
                                                src={item.product.mainImage}
                                                alt={item.product.name}
                                                className='rounded-lg w-24 h-24 object-cover mr-4'
                                            />
                                            <div className='flex flex-col m-2'>
                                                <h2 className='text-lg font-semibold'>
                                                    {item.product.name}
                                                </h2>
                                                <p className='text-gray-600'>
                                                    Quantity:
                                                    {item.quantity}
                                                </p>
                                                <div className='flex items-center gap-2'>
                                                    <p className='text-slate-600'>
                                                        Rating: {item.product.productRating.averageRating}
                                                        <span className='text-yellow-500 text-lg'>
                                                            &#9733;
                                                        </span>
                                                        | {item.product.productRating.totalReviews} reviews
                                                    </p>
                                                </div>
                                                <p className='text-lg'>
                                                    Price: ₹{item.product.price}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                className='mt-3 w-full lg:w-fit cursor-pointer'>
                                                Update Quantity
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent >
                                            <UpdateCartItemQty
                                                quantity={item.quantity}
                                                product={item.product}
                                            />
                                        </PopoverContent>
                                    </Popover>

                                </div>
                                <Button
                                    variant='github'
                                    className='cursor-pointer'
                                    disabled={loading === "pending"}
                                    onClick={() => handleremoveItemFromCart(item.product.slug)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}


                    </div>
                </div>
                <div className='md:col-span-4 p-4 border-l border-slate-200 '>
                    <h2 className='sm:text-xl font-semibold mb-4'>Price Details</h2>
                    <div className='flex flex-col gap-4 p-4 border-b border-slate-200 '>
                        <div className='flex items-start mx-4 justify-between'>
                            <p className='text-slate-700 font-medium'>Total Products Price:</p>
                            <span className='font-medium text-slate-700'>
                                + ₹{cart.cartTotal}
                            </span>
                        </div>
                        <div className='flex items-start mx-4 justify-between'>
                            <p className='text-green-600 font-medium'>Total Discount:</p>
                            <span className='text-green-600 font-medium'>
                                - {cart.discountValue}
                            </span>
                        </div>
                    </div>
                    <div className='p-4 flex items-start mx-4 justify-between'>
                        <p className='sm:text-xl font-semibold'>Total Price:</p>
                        <span className='font-semibold text-slate-700'>
                            ₹{cart.discountedTotal}
                        </span>
                    </div>
                    {!!cart.discountValue &&
                        <div className='p-4 mx-4 bg-green-400 rounded-lg'>
                            <p className='text-white font-medium'>You saved ₹{cart.discountValue} on this order!</p>
                        </div>
                    }
                    {/* this for apply coupon */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col mx-4 mt-4  border-t
                     border-slate-200 pt-4'>
                        <div className='flex justify-between gap-2 items-center'>
                            <Input
                                type='text'
                                placeholder='Apply Coupon'
                                {...register("couponCode", { required: "Coupon code is required" })}
                            />
                            <Button
                                disabled={couponLoading === "pending"}
                                type='submit'
                                variant='github'
                                className='cursor-pointer'
                            >
                                Apply
                            </Button>
                        </div>

                        {errors.couponCode && <span className="text-red-500 m-2">{errors.couponCode.message}</span>}
                    </form>
                    <Button
                        onClick={() => navigate("/checkout/address")}
                        className='w-full mt-6 cursor-pointer'>
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Cart
