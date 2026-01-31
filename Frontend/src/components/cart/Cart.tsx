import React from 'react'
import { Button } from '../lightswind/button'
import { Plus } from 'lucide-react'

const Cart: React.FC = () => {

    const item =
    {
        id: 1, name: `
            M19/M10/T12/ULTRABUDS/EARPODS TWS Bluetooth Earbuds Wireless Bluetooth 5.1 Stereo IPX7 Waterproof bluetooth Headset
             wireless earbuds ANC Earbuds which comes with 20 hour Battery Backup`
        , price: 100, quantity: 2, mainImage: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D"

    }
    return (
        <div>
            <div className='flex flex-col gap-4 w-full sm:w-[70vw] lg:w-[40vw]
                    border border-slate-200 rounded-lg p-4'>
                <div className='flex flex-col  '>
                    <div className='flex flex-col justify-center gap-3'>
                        <div className='flex items-center m-2'>
                            <img src={item.mainImage} alt={item.name} className='rounded-lg w-24 h-24 object-cover mr-4' />
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-lg font-semibold'>
                                    {item.name.length > 50 ? `${item.name.substring(0, 50)}...` : item.name}
                                </h2>
                                <p className='text-lg'>Price: ${item.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center justify-center mt-4 '>
                        <span>Qty</span>
                        <Button variant='github'
                            className='p-2 cursor-pointer'>
                            <Plus />
                        </Button>
                        <span className='text-center '>{item.quantity}</span>
                        <Button variant='github'
                            className='p-2 cursor-pointer'>
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className='flex justify-between items-center p-4 border-y border-slate-200'>
                    <p>Total Price</p>
                    <p>${item.price * item.quantity}</p>
                </div>
                <div className='border-b border-slate-200 p-2'>
                    <Button
                        className='w-full cursor-pointer'
                        >
                        Update Quantity
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Cart
