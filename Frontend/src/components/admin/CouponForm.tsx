import React from 'react'
import { Label } from '../lightswind/label'
import { Input } from '../lightswind/input'
import { Button } from '../lightswind/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lightswind/select'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import type { AddCouponReq, UpdateCoupon } from '../../types/coupon'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { createCoupon, updateCoupon } from '../../features/admin/coupon/couponSlice'
import { Spinner } from '../ui/spinner'


interface CouponFormData {
    _id?: string;
    couponCode?: string;
    discountPercentage?: number;
    isActive?: boolean;
    minCartValue?: number;
    limit?: number;
    expiryTime?: string;

}

const CouponForm = ({
    _id,
    couponCode,
    discountPercentage,
    isActive = true,
    minCartValue,
    limit,
    expiryTime
}: CouponFormData) => {

    const loading = useAppSelector(({ coupon }) => coupon.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AddCouponReq>({
        defaultValues: {
            name: couponCode,
            discountPercentage,
            isActive,
            minCartValue,
            limit,
            expiryTime: expiryTime ? new Date(expiryTime).toISOString().slice(0, 16) : undefined,
        }
    })

    const onSubmit: SubmitHandler<AddCouponReq> = (data) => {
        const couonData = { ...data, expiryTime: new Date(data.expiryTime).toISOString() }

        if (expiryTime && _id) {
            const updateCouponData: UpdateCoupon = {}
            if (couonData.name !== couponCode) updateCouponData["name"] = couonData.name;
            if (couonData.discountPercentage !== discountPercentage) updateCouponData["discountPercentage"] = couonData.discountPercentage;
            if (couonData.isActive !== isActive) updateCouponData["isActive"] = couonData.isActive;
            if (couonData.minCartValue !== minCartValue) updateCouponData["minCartValue"] = couonData.minCartValue;
            if (couonData.limit !== limit) updateCouponData["limit"] = couonData.limit;
            if (couonData.backCouponType) {
                updateCouponData["backCouponType"] = couonData.backCouponType
                updateCouponData["name"] = couonData.name
            }
            // data because of deafult value of expiry foeld is as same as expiry props value
            // in couponData , the value has been chnage 
            if (data.expiryTime !== new Date(expiryTime).toISOString().slice(0, 16)) {
                updateCouponData["expiryTime"] = couonData.expiryTime;
            }
            dispatch(updateCoupon({ couponId: _id, data: updateCouponData }))
                .unwrap()
                .then((couponData) => {
                    navigate("/admin/coupon")
                    toast.success(couponData.message)
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        } else {
            dispatch(createCoupon(couonData))
                .unwrap()
                .then((couponData) => {
                    navigate("/admin/coupon")
                    toast.success(couponData.message)
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <div className="p-4">
            <div className="text-center">
                <h2 className="text-3xl font-semibold">New Coupon Code</h2>
                <p className="mt-2 text-slate-500">Add new coupon</p>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mt-6 gap-4">
                    <div>
                        <Label htmlFor="coupone_code">Coupon Code</Label>
                        <Input
                            id="coupone_code"
                            type="text"
                            placeholder="Code"
                            className="focus:outline-none mt-2"
                            {...register("name", { required: "Coupon name is required" })}
                        />
                        {errors.name && <span className="text-red-500 m-2">{errors.name.message}</span>}
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <Label htmlFor="discountPercentage">Discount Percentage</Label>
                            <Input
                                id="discountPercentage"
                                type="number"
                                placeholder="Enter discount percentage"
                                className="focus:outline-none mt-2 "
                                {...register("discountPercentage", { required: "Discount percentage is required" })}
                            />
                            {errors.discountPercentage && <span className="text-red-500 m-2">{errors.discountPercentage.message}</span>}
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="minCartValue">Minimum Cart Value</Label>
                            <Input
                                id="minCartValue"
                                type="number"
                                placeholder="Enter minimum cart value"
                                className="focus:outline-none mt-2"
                                {...register("minCartValue", { required: "Minimum cart value is required" })}
                            />
                            {errors.minCartValue && <span className="text-red-500 m-2">{errors.minCartValue.message}</span>}
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <Label htmlFor="limit_number">Limite Number</Label>
                            <Input
                                id="limit_number"
                                type="number"
                                placeholder="Enter limit number to be used"
                                className="focus:outline-none mt-2 "
                                {...register("limit", { required: "Limit number is required" })}
                            />
                            {errors.limit && <span className="text-red-500 m-2">{errors.limit.message}</span>}
                        </div>
                        <div className='w-[50%] sm:w-full'>
                            <Label htmlFor="expiry_time">Expiry Time</Label>
                            <Input
                                id="expiry_time"
                                type="datetime-local"
                                className="focus:outline-none mt-2"
                                {...register("expiryTime", { required: "Expiry time is required" })}
                            />
                            {errors.expiryTime && <span className="text-red-500 m-2">{errors.expiryTime.message}</span>}
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <Label htmlFor="isActive">Active</Label>
                            <Controller
                                name="isActive"
                                control={control}
                                rules={{
                                    required: "IsActive is required"
                                }}
                                render={(({ field }) => (
                                    <Select
                                        value={field.value ? "true" : "false"}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full mt-4">
                                            <SelectValue placeholder="IsActive" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">True</SelectItem>
                                            <SelectItem value="false">False</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ))}
                            />
                            {errors.isActive && <span className="text-red-500 m-2">{errors.isActive.message}</span>}
                        </div>
                        <div className='w-[50%] sm:w-full'>
                            <Label htmlFor="backCouponType">Back Coupon Type</Label>
                            <Controller
                                name="backCouponType"
                                control={control}
                                render={(({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full mt-4">
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="string">String</SelectItem>
                                            <SelectItem value="number">Number</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ))}
                            />
                        </div>
                    </div>
                    <Button
                        type='submit'
                        className="cursor-pointer">
                        {loading === "pending" ?
                            <Spinner data-icon="inline-start" />
                            : "Submit"
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CouponForm
