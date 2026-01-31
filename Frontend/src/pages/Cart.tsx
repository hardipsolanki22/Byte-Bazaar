import React from 'react'
import { Button } from '../components/lightswind/button'
import { Popover, PopoverContent, PopoverTrigger } from '../components/lightswind/popover'
import UpdateCartItemQty from '../components/cart/Cart'
import { Input } from '../components/lightswind/input'

const Cart: React.FC = () => {

    const cartItems = [
        {
            id: 1, name: `
            M19/M10/T12/ULTRABUDS/EARPODS TWS Bluetooth Earbuds Wireless Bluetooth 5.1 Stereo IPX7 Waterproof bluetooth Headset
             wireless earbuds ANC Earbuds which comes with 20 hour Battery Backup`
            , price: 100, quantity: 2, mainImage: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D"
            , avrageRating: 4.5, countProductRating: 120
        },
        {
            id: 2, name: "Product 2", price: 200, quantity: 1, mainImage: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D"
            , avrageRating: 4.0, countProductRating: 80
        },
        {
            id: 3, name: "Product 3", price: 150, quantity: 3, mainImage: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D"
            , avrageRating: 3.5, countProductRating: 50
        },
    ]

    return (
        <div className='flex flex-col md:flex-row  items-center justify-center'>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    <h2 className='sm:text-xl font-semibold text-start'>Products Details</h2>
                    <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                        {/* Product items will go here */}
                        {cartItems.map((item) => (
                            <div key={item.id} className='flex flex-col gap-4
                    border border-slate-200 rounded-lg p-4'>
                                <div className='flex flex-col lg:flex-row justify-between'>
                                    <div className='flex justify-center gap-3'>
                                        <img src={item.mainImage} alt={item.name} className='rounded-lg w-24 h-24 object-cover mr-4' />
                                        <div className='flex flex-col m-2'>
                                            <h2 className='text-lg font-semibold'>{
                                            }</h2>
                                            <p className='text-gray-600'>Quantity: {item.quantity}</p>
                                            <div className='flex items-center gap-2'>
                                                <p className='text-slate-600'>Rating: {item.avrageRating}
                                                    <span className='text-yellow-500 text-lg'>&#9733;</span> | {item.countProductRating} reviews</p>
                                            </div>
                                            <p className='text-lg'>Price: ${item.price}</p>
                                        </div>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                className='mt-3 w-full lg:w-fit cursor-pointer'>
                                                Update Quantity
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent >
                                            <UpdateCartItemQty />
                                        </PopoverContent>
                                    </Popover>

                                </div>
                                <Button variant='github' className='cursor-pointer'>
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
                            <span className='font-medium text-slate-700'>+ ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                        </div>
                        <div className='flex items-start mx-4 justify-between'>
                            <p className='text-green-600 font-medium'>Total Discount:</p>
                            <span className='text-green-600 font-medium'> - $17</span>
                        </div>
                    </div>
                    <div className='p-4 flex items-start mx-4 justify-between'>
                        <p className='sm:text-xl font-semibold'>Total Price:</p>
                        <span className='font-semibold text-slate-700'>${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) - 17}</span>
                    </div>
                    <div className='p-4 mx-4 bg-green-400 rounded-lg'>
                        <p className='text-white font-medium'>You saved $17 on this order!</p>
                    </div>
                    {/* this for apply coupon */}
                    <div className='flex mx-4 mt-4 justify-between gap-2 items-center border-t border-slate-200 pt-4'>
                        <Input
                            type='text'
                            placeholder='Apply Coupon'
                        />
                        <Button
                            variant='github'
                            className='cursor-pointer'
                        >
                            Apply
                        </Button>
                    </div>
                    <Button className='w-full mt-6 cursor-pointer'>
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Cart
