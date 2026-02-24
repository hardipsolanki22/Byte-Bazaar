import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lightswind/select'
import { Button } from '../lightswind/button'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { FilterOrders } from '../../types/order'
import { Spinner } from '../ui/spinner'
import { updateOrderStatusAndIsPaymentDone } from '../../features/admin/order/orderSlice'
import { toast } from 'sonner'

interface UpdatePaymentAndOrderStatusProps {
    orderId: string,
    ispaymentdone: boolean,
    status: "PENDING" | "DELIVERED" | "CANCELLED"
}

const UpdatePaymentAndOrderStatus = ({ orderId, ispaymentdone, status }: UpdatePaymentAndOrderStatusProps) => {
    const loading = useAppSelector(({ order }) => order.loading)
    const dispatch = useAppDispatch()
    const [updateData, setUpdateData] = useState<FilterOrders>({
        ispaymentdone: ispaymentdone,
        status: status
    })
    const handleOrderUpdate = () => {
        dispatch(updateOrderStatusAndIsPaymentDone({ orderId, data: updateData }))
            .unwrap()
            .then((res) => {
                toast.success(res.message)
            })
    }
    console.log(updateData)

    return (
        <div className='flex flex-col  p-4 
        my-3 w-full sm:w-[70vw] lg:w-[40vw]'>
            <div className='flex flex-col sm:flex-row justify-evenly items-center'>
                <div className='flex sm:flex-col justify-center w-full items-center'>
                    <span className='text-sm sm:text-lg w-[90%] sm:w-auto'>Update Payment</span>
                    <div className='sm:mx-4 w-[70%] flex justify-center items-center'>
                        <Select
                            value={updateData.ispaymentdone === true ? "true" : updateData.ispaymentdone === false ? "false" : undefined}
                            onValueChange={(value) => {
                                setUpdateData(prev => ({ ...prev, ispaymentdone: value === "true" ? true : false }))
                            }}
                        >
                            <SelectTrigger className="w-full mt-4 cursor-pointer">
                                <SelectValue placeholder="Payment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Paid</SelectItem>
                                <SelectItem value="false">Unpaid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex sm:flex-col justify-center w-full items-center'>
                    <span className='text-sm sm:text-lg w-[90%] sm:w-auto'>Update Order Status</span>
                    <div className='sm:mx-4 w-full flex justify-center items-center'>
                        <Select
                            value={updateData.status}
                            onValueChange={(value) => {
                                setUpdateData(prev => ({ ...prev, status: value as any }))
                            }}
                        >
                            <SelectTrigger className="w-[70%] mt-4 cursor-pointer">
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
            <div className='flex justify-center sm:justify-end items-center'>
                <Button
                    onClick={handleOrderUpdate}
                    className='w-fit mt-6 cursor-pointer'>
                    {loading === "pending" ?
                        <Spinner data-icon="inline-start" />
                        : "Confirm Update"
                    }
                </Button>

            </div>
        </div>
    )
}

export default UpdatePaymentAndOrderStatus
