import React from 'react'
import { Button } from '../lightswind/button'
import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'
import { Checkbox } from '../lightswind/checkbox'



const Address: React.FC<{ isUpdate?: boolean }> = ({
    isUpdate = false
}) => {
    return (
        <div className='flex justify-center flex-col w-full sm:w-[70vw] lg:w-[40vw] '>
            <div className="mb-4 border-b py-2 border-slate-300 text-center ">
                <h2 className="text-2xl font-semibold">
                    {isUpdate ? "Update Address" : "Add New Address"}
                </h2>
            </div>
            <form className="flex flex-col gap-4">
                <div>
                    <Label htmlFor="address_line">Address Line</Label>
                    <Input
                        id="address_line"
                        type="text"
                        placeholder="Address line"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                        id="country"
                        type="text"
                        placeholder="Country"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                        id="state"
                        type="text"
                        placeholder="State"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        type="text"
                        placeholder="City"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div className='flex gap-4 items-end'>
                    <div className='w-[50%]'>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                            id="pincode"
                            type="text"
                            placeholder="Pincode"
                            className="focus:outline-none mt-2"
                        />
                    </div>
                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox id={"primary-check"} />
                        <Label
                            htmlFor="primary-check"
                        >Set as Primary
                        </Label>
                    </div>
                </div>
                <Button className="cursor-pointer">
                    {isUpdate ? "Update Address" : "Add Address"}
                </Button>

            </form>
        </div>
    )
}

export default Address
