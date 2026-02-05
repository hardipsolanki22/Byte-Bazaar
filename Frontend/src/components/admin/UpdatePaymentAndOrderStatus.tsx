import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lightswind/select'

const UpdatePaymentAndOrderStatus: React.FC = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-evenly items-center p-4 
        my-3 w-full sm:w-[70vw] lg:w-[40vw]'>
            <div className='flex sm:flex-col justify-center w-full items-center'>
                <span className='text-sm sm:text-lg w-[90%] sm:w-auto'>Update Payment</span>
                <div className='sm:mx-4 w-[70%] flex justify-center items-center'>
                    <Select>
                        <SelectTrigger className="w-full mt-4">
                            <SelectValue placeholder="Payment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex sm:flex-col justify-center w-full items-center'>
                <span className='text-sm sm:text-lg w-[90%] sm:w-auto'>Update Order Status</span>
                <div className='sm:mx-4 w-full flex justify-center items-center'>
                    <Select>
                        <SelectTrigger className="w-[70%] mt-4">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>
    )
}

export default UpdatePaymentAndOrderStatus
