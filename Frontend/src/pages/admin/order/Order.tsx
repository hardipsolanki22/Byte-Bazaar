import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/lightswind/select'
import { Avatar, AvatarImage } from '../../../components/lightswind/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../components/lightswind/table'
import { Badge } from '../../../components/lightswind/badge'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { clearSingleOrder, getOrders } from '../../../features/admin/order/orderSlice'
import type { FilterOrders } from '../../../types/order'

const Order: React.FC = () => {
    const loading = useAppSelector(({ order }) => order.loading)
    const orders = useAppSelector(({ order }) => order.orders)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [filters, setFilters] = useState<FilterOrders>({
        status: undefined,
        ispaymentdone: undefined
    })
    useEffect(() => {
        if (!orders?.length)
            dispatch(getOrders(filters))
        if (filters.status !== undefined || filters.ispaymentdone !== undefined) {
            dispatch(getOrders(filters))
        }
        dispatch(clearSingleOrder())
    }, [dispatch, filters.ispaymentdone, filters.status])

    if (loading === 'pending' && !orders?.length) {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col p-4 w-full'>
            <div className='flex items-center justify-end space-x-2 '>
                <div className='w-fit my-4'>
                    <Select
                        value={filters.status}
                        onValueChange={(value) => {
                            setFilters(prev => ({ ...prev, status: value as any }))
                        }}
                    >
                        <SelectTrigger className="w-full mt-4 cursor-pointer">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="delivered">DELIVERED</SelectItem>
                            <SelectItem value="cancelled">CANCELLED</SelectItem>
                            <SelectItem value="pending">PENDING</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='w-fits'>
                    <Select
                        value={filters.ispaymentdone === true ? "paid" : filters.ispaymentdone === false ? "unpaid" : undefined}
                        onValueChange={(value) => {
                            setFilters(prev => ({ ...prev, ispaymentdone: value === "paid" ? true : false }))
                        }}
                    >
                        <SelectTrigger className="w-full mt-4 cursor-pointer">
                            <SelectValue placeholder="Payment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="unpaid">Unpaid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            {orders?.length === 0 ? (
                <div className='w-full flex items-center justify-center text-center h-full'>

                    <h2 className='text-2xl text-slate-600 font-semibold'>
                        No Orders Found
                    </h2>
                </div>
            ) : (
                <div className='w-full'>

                    <div>
                        <Table className='m-4'>
                            <TableCaption>A list of your recent orders.</TableCaption>
                            <TableHeader className='dark:bg-green-600'>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Total Items</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment Type</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Total Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders?.map((order) => (
                                    <TableRow
                                        key={order._id}
                                        onClick={() => navigate(`/admin/order/${order._id}`)}
                                        className='cursor-pointer'>
                                        <TableCell>
                                            <div className='flex gap-3 items-center'>
                                                <Avatar>
                                                    <AvatarImage src={order.user.avatar} alt={order.user.fullName} />
                                                </Avatar>
                                                <p className='font-semibold sm:text-lg'>{order.user.fullName}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>{order.totalItems}</TableCell>
                                        <TableCell>
                                            {order.status === "DELIVERED" && (
                                                <Badge variant={'success'}>
                                                    {order.status}
                                                </Badge>
                                            )}
                                            {order.status === "CANCELLED" && (
                                                <Badge variant={'destructive'}>
                                                    {order.status}
                                                </Badge>
                                            )}
                                            {order.status === "PENDING" && (
                                                <Badge variant={'warning'}>
                                                    {order.status}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {order.paymentType === "COD" ? (
                                                <Badge variant={'secondary'}>
                                                    COD
                                                </Badge>
                                            ) : (
                                                <Badge variant={'success'}>
                                                    ONLINE
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {order.isPaymentDone ? (
                                                <Badge variant={'success'}>
                                                    Paid
                                                </Badge>
                                            ) : (
                                                <Badge variant={'destructive'}>
                                                    Unpaid
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {order.orderPrice.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR"
                                            }
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>

            )
            }



        </div >
    )
}

export default Order
