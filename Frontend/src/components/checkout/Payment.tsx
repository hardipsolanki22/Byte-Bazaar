import React from 'react'
import { Checkbox } from '../lightswind/checkbox'
import { Button } from '../lightswind/button'
import { useNavigate } from 'react-router-dom';
import { Label } from '../lightswind/label';

const Payment: React.FC = () => {

    const navigate = useNavigate();

    const availablePaymentMethods = [
        {
            id: 1,
            method: "COD - Cash on Delivery",
            description: "Pay with cash upon delivery.",
        },
        {
            id: 2,
            method: "Pay Online - Credit/Debit Card",
            description: "Pay using your credit or debit card.",
        }
    ]
    return (
        <div>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    <h2 className='sm:text-xl font-semibold text-start'>Select Payment Method</h2>
                    <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                        {/* Payment Method items will go here */}
                        {availablePaymentMethods.map((payment) => (
                            <div key={payment.id} className="border border-slate-200 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 my-2">
                                    <Checkbox id={`primary-${payment.id}`} />
                                    <Label
                                        htmlFor={`primary-${payment.id}`}
                                    >{payment.method}
                                    </Label>
                                </div>
                                {/* <h3 className="font-medium">{payment.method}</h3> */}
                                <p className="text-slate-700 text-sm">{payment.description}</p>
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

export default Payment
