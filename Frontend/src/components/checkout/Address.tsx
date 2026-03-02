import React, { useEffect } from 'react'
import { Checkbox } from '../lightswind/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '../lightswind/popover'
import { Button } from '../lightswind/button'
import CreatedAddress from "../address/Address"
import { useNavigate } from 'react-router-dom'
import { Label } from '../lightswind/label'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getUserCart } from '../../features/cart/cartSlice'
import { getAddresses } from '../../features/address/addressSlice'
import { setAddressId } from '../../features/checkout/checkoutSlice'

const Address: React.FC = () => {

    const cartLoading = useAppSelector(({ cart }) => cart.loading)
    const addresses = useAppSelector(({ address }) => address.addresses)
    const addressLoading = useAppSelector(({ address }) => address.loading)
    const cart = useAppSelector(({ cart }) => cart.cart)
    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    useEffect(() => {
        if (!cart || !addresses?.length) {
            Promise.all([
                dispatch(getUserCart()),
                dispatch(getAddresses())
            ])
        }
    }, [dispatch])

    if (cartLoading === "pending" || addressLoading === "idle") {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }
    const primaryAddress = addresses?.find(add => add.isPrimary === true)
    
    const handleCheckout = () => {
        if (primaryAddress) {
            dispatch(setAddressId(primaryAddress?._id))
            navigate("/checkout/payment")
        }
    }
    return (
        <div className='w-full'>

            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    {!addresses?.length && addressLoading === "succeeded" ? (
                        <div className='p-4 mt-4 bg-white rounded-md w-full flex items-center justify-center '>
                            <CreatedAddress />
                        </div>
                    ) : (<>
                        <div className='flex justify-between '>
                            <h2 className='sm:text-xl font-semibold text-start'>Select Delivery Address</h2>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className='cursor-pointer'
                                    >
                                        + Add New Address
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent >
                                    <CreatedAddress />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                            {/* Address items will go here */}
                            {addresses?.map((address) => (
                                <div key={address._id}
                                    className="border border-slate-200 p-4 rounded-lg">
                                    {address.isPrimary &&
                                        <div className="flex items-center space-x-2 my-2">
                                            <Checkbox
                                                checked={address.isPrimary}
                                                className="pointer-events-none"
                                                disabled
                                            />
                                            <Label
                                                htmlFor={`primary-${address._id}`}
                                            >Primary Address
                                            </Label>
                                        </div>}
                                    <p className="font-medium">{address.addressLine}</p>
                                    <p className="text-slate-700">{address.city}, {address.state}, {address.country} - {address.pincode}</p>
                                </div>
                            ))}

                        </div>
                    </>)
                    }

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
                        onClick={handleCheckout}
                        className='w-full mt-6 cursor-pointer'>
                        Continue
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Address
