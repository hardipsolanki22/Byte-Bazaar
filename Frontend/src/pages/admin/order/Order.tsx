import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/lightswind/select'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/lightswind/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../components/lightswind/table'
import { Badge } from '../../../components/lightswind/badge'
import { useNavigate } from 'react-router-dom'

const Order: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col p-4 w-full'>
            <div className='flex items-center justify-end space-x-2 '>
                <div className='w-fit my-4'>
                    <Select>
                        <SelectTrigger className="w-full mt-4">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='w-fits'>
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
                        <TableRow onClick={() => navigate(`/admin/order/${"kje98t94t98jg"}`)} className='cursor-pointer'>
                            <TableCell>
                                <div className='flex gap-3 items-center'>
                                    <Avatar>
                                        <AvatarImage src="/hardip.jpg" alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p className='font-semibold sm:text-lg'>Hardip Solanki</p>
                                </div>

                            </TableCell>
                            <TableCell>04 Feb 2026, 10 : 40 AM</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>
                                <Badge variant={'success'}>
                                    DELIVERED
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={'info'}>
                                    Stripe
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={'success'}>
                                    Done
                                </Badge>
                            </TableCell>
                            <TableCell>
                                34420
                            </TableCell>
                        </TableRow>
                        <TableRow onClick={() => navigate(`/admin/order/${"HFHF75784H"}`)} className='cursor-pointer'>
                            <TableCell>
                                <div className='flex gap-3 items-center'>
                                    <Avatar>
                                        <AvatarImage src="/hardip.jpg" alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p className='font-semibold sm:text-lg'>Hardip Solanki</p>
                                </div>

                            </TableCell>
                            <TableCell>04 Feb 2026, 10 : 40 AM</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>
                                <Badge variant={'success'}>
                                    DELIVERED
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={'info'}>
                                    Stripe
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={'success'}>
                                    Done
                                </Badge>
                            </TableCell>
                            <TableCell>
                                34420
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>


        </div >
    )
}

export default Order
