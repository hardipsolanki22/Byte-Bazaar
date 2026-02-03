import React from 'react'
import { Label } from '../lightswind/label'
import { Input } from '../lightswind/input'
import { Button } from '../lightswind/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lightswind/select'

const CouponForm: React.FC = () => {
    return (
        <div className="p-4">
            <div className="text-center">
                <h2 className="text-3xl font-semibold">New Coupon Code</h2>
                <p className="mt-2 text-slate-500">Add new coupon</p>
            </div>
            <div>
                <form className="flex flex-col mt-6 gap-4">
                    <div>
                        <Label htmlFor="coupone_code">Coupon Code</Label>
                        <Input
                            id="coupone_code"
                            type="text"
                            placeholder="Code"
                            className="focus:outline-none mt-2"
                        />
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <Label htmlFor="discountPercentage">Discount Percentage</Label>
                            <Input
                                id="discountPercentage"
                                type="number"
                                placeholder="Enter discount percentage"
                                className="focus:outline-none mt-2 "
                            />
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="minCartValue">Minimum Cart Value</Label>
                            <Input
                                id="minCartValue"
                                type="number"
                                placeholder="Enter minimum cart value"
                                className="focus:outline-none mt-2"
                            />
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
                            />
                        </div>
                        <div className='w-[50%] sm:w-full'>
                            <Label htmlFor="expiry_time">Expiry Time</Label>
                            <Input
                                id="expiry_time"
                                type="datetime-local"
                                className="focus:outline-none mt-2"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="isActive">Active</Label>
                        <Select>
                            <SelectTrigger className="w-full mt-4">
                                <SelectValue placeholder="IsActive" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="True">True</SelectItem>
                                <SelectItem value="False">False</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="cursor-pointer">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CouponForm
