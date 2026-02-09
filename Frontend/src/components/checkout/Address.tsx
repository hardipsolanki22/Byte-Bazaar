import React from 'react'
import { Checkbox } from '../lightswind/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '../lightswind/popover'
import { Button } from '../lightswind/button'
import CreatedAddress from "../address/Address"
import { useNavigate } from 'react-router-dom'
import { Label } from '../lightswind/label'

const Address: React.FC = () => {

    const navigate = useNavigate();

    const addresses = [
        {
            id: 1,
            addresLine: "Annpuna Hospital, Tulshidham Society, Hanuman Temple Near,",
            city: "Pune",
            state: "Maharashtra",
            country: "India",
            pin: "411033",
        },
        {
            id: 2,
            addresLine: "123, MG Road,",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            pin: "560001",
        }
    ]

    return (
        <div>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
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
                        {addresses.map((address) => (
                            <div key={address.id} className="border border-slate-200 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 my-2">
                                    <Checkbox id={`primary-${address.id}`} />
                                    <Label
                                        htmlFor={`primary-${address.id}`}
                                    >Primary Address
                                    </Label>
                                </div>
                                <p className="font-medium">{address.addresLine}</p>
                                <p className="text-slate-700">{address.city}, {address.state}, {address.country} - {address.pin}</p>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='md:col-span-4 p-4 border-l border-slate-200 '>
                    <h2 className='sm:text-xl font-semibold mb-4'>Price Details</h2>
                    <div className='flex flex-col gap-4 p-4 border-b border-slate-200 '>
                        <div className='flex items-start mx-4 justify-between'>
                            <p className='text-slate-700 font-medium'>Total Products Price:</p>
                            <span className='font-medium text-slate-700'>+ $850</span>
                        </div>
                        <div className='flex items-start mx-4 justify-between'>
                            <p className='text-green-600 font-medium'>Total Discount:</p>
                            <span className='text-green-600 font-medium'> - $17</span>
                        </div>
                    </div>
                    <div className='p-4 flex items-start mx-4 justify-between'>
                        <p className='sm:text-xl font-semibold'>Total Price:</p>
                        <span className='font-semibold text-slate-700'>$833</span>
                    </div>
                    <div className='p-4 mx-4 bg-green-400 rounded-lg'>
                        <p className='text-white font-medium'>You saved $17 on this order!</p>
                    </div>
                    <Button
                        onClick={() => navigate("/checkout/payment")}
                        className='w-full mt-6 cursor-pointer'>
                        Continue
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Address
