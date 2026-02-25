import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/lightswind/table";
import { Button } from '../../../components/lightswind/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteCoupon, getCoupons } from '../../../features/coupon/couponSlice';
import { toast } from 'sonner';

const Coupon: React.FC = () => {
    const coupons = useAppSelector(({ coupon }) => coupon.coupons)
    const loading = useAppSelector(({ coupon }) => coupon.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!coupons?.length) {
            dispatch(getCoupons())
        }
    }, [dispatch])

    if (loading === 'pending' && !coupons?.length) {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }

    const deleteCouponHandler = (couponId: string) => {
        dispatch(deleteCoupon(couponId))
            .unwrap()
            .then((couponData) => {
                toast.success(couponData.message)
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }


    return (
        <div className='flex flex-col w-full p-4'>
            {coupons.length === 0 ? (
                <div className='w-full flex items-center justify-center text-center h-full'>
                    <h2 className='text-2xl text-slate-600 font-semibold'>
                        No Coupons Found
                    </h2>
                </div>
            ) : (
                <div className='w-full'>
                    <div className='flex justify-between mx-2 my-4'>
                        <h2 className='text-2xl font-semibold'>Coupon Management</h2>
                        <Button
                            onClick={() => navigate("/admin/add-coupon")}
                            className='cursor-pointer'>
                            Add New Coupon
                        </Button>
                    </div>
                    <Table className='m-4'>
                        <TableCaption>A list of your recent coupon.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Minimum Cart Value</TableHead>
                                <TableHead>Discount Percentage</TableHead>
                                <TableHead>isActive</TableHead>
                                <TableHead>Expiry Time</TableHead>
                                <TableHead>Limit Number</TableHead>
                                <TableHead>Used From</TableHead>
                                <TableHead>isExpire</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map((coupon) => (
                                <TableRow
                                    key={coupon._id}
                                >
                                    <TableCell>{coupon.couponCode}</TableCell>
                                    <TableCell>{coupon.minCartValue}</TableCell>
                                    <TableCell>{coupon.discountPercentage}%</TableCell>
                                    <TableCell>{coupon.isActive ? "True" : "False"}</TableCell>
                                    <TableCell>{
                                        new Date(coupon.expiryTime).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </TableCell>
                                    <TableCell>{coupon.limit}</TableCell>
                                    <TableCell>{coupon.usedFrom}</TableCell>
                                    <TableCell>{coupon.isExpire ? "True" : "False"}</TableCell>
                                    <TableCell className='flex flex-col sm:flex-row gap-2'>
                                        <Button
                                            className='p-2 cursor-pointer'
                                            variant='github'
                                            onClick={() => navigate(`/admin/coupon/${coupon._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => deleteCouponHandler(coupon._id)}
                                            className='p-2 cursor-pointer'
                                            variant='destructive'>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>
            )
            }

        </div>
    );
}

export default Coupon
