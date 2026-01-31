import React from 'react'
import { Button } from '../lightswind/button'
import { Input } from '../lightswind/input'



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
                    <label htmlFor="address_line">Address Line</label>
                    <Input
                        id="address_line"
                        type="text"
                        placeholder="Address line"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <Input
                        id="country"
                        type="text"
                        placeholder="Country"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <Input
                        id="state"
                        type="text"
                        placeholder="State"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <Input
                        id="city"
                        type="text"
                        placeholder="City"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="pincode">Pincode</label>
                    <Input
                        id="pincode"
                        type="text"
                        placeholder="Pincode"
                        className="focus:outline-none mt-2"
                    />
                </div>
                <Button className="cursor-pointer">
                    {isUpdate ? "Update Address" : "Add Address"}
                </Button>

            </form>
        </div>
    )
}

export default Address
