import React from 'react'
import { Button } from '../lightswind/button'
import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'
import { Checkbox } from '../lightswind/checkbox'
import type { AddAddressReq, Address as AddressType } from '../../types/addressTypes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { addAddress, updateAddress } from '../../features/address/addressSlice'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'

interface AddressProps {
    address?: AddressType
}

const Address = ({ address }: AddressProps) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddAddressReq>({
        defaultValues: {
            addressLine: address?.addressLine || "",
            country: address?.country || "",
            state: address?.state || "",
            city: address?.city || "",
            pincode: address?.pincode || "",
            isPrimary: address?.isPrimary || false
        }
    })

    const dispatch = useAppDispatch()
    const loading = useAppSelector(({ address }) => address.loading)

    const onSubmit: SubmitHandler<AddAddressReq> = (data) => {
        if (address) {
            dispatch(updateAddress({ addressId: address._id, data }))
                .unwrap()
                .then((userData) => {
                    toast.success(userData.message)
                    reset()
                })
        }
        else {
            dispatch(addAddress(data))
                .unwrap()
                .then((userData) => {
                    toast.success(userData.message)
                    reset()
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <div className='flex justify-center flex-col w-full sm:w-[70vw] lg:w-[40vw] '>
            <div className="mb-4 border-b py-2 border-slate-300 text-center ">
                <h2 className="text-2xl font-semibold">
                    {address ? "Update Address" : "Add New Address"}
                </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4">
                <div>
                    <Label htmlFor="address_line">Address Line</Label>
                    <Input
                        id="address_line"
                        type="text"
                        placeholder="Address line"
                        className="focus:outline-none mt-2"
                        {...register("addressLine", { required: "Address line is required" })}
                    />
                    {errors.addressLine && <span className="text-red-500 m-2">{errors.addressLine.message}</span>}

                </div>
                <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                        id="country"
                        type="text"
                        placeholder="Country"
                        className="focus:outline-none mt-2"
                        {...register("country", { required: "country is required" })}
                    />
                    {errors.country && <span className="text-red-500 m-2">{errors.country.message}</span>}

                </div>
                <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                        id="state"
                        type="text"
                        placeholder="State"
                        className="focus:outline-none mt-2"
                        {...register("state", { required: "State is required" })}

                    />
                    {errors.state && <span className="text-red-500 m-2">{errors.state.message}</span>}

                </div>
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        type="text"
                        placeholder="City"
                        className="focus:outline-none mt-2"
                        {...register("city", { required: "City is required" })}

                    />
                    {errors.city && <span className="text-red-500 m-2">{errors.city.message}</span>}

                </div>
                <div className='flex gap-4 items-end'>
                    <div className='w-[50%]'>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                            id="pincode"
                            type="text"
                            placeholder="Pincode"
                            className="focus:outline-none mt-2"
                            {...register("pincode", { required: "Pincode is required" })}

                        />
                        {errors.pincode && <span className="text-red-500 m-2">{errors.pincode.message}</span>}

                    </div>
                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                            {...register("isPrimary")}
                            id={"primary-check"} />
                        <Label
                            htmlFor="primary-check"
                        >Set as Primary
                        </Label>
                        {/* {errors.isPrimary && <span className="text-red-500 m-2">{errors.isPrimary.message}</span>} */}

                    </div>
                </div>
                <Button className="cursor-pointer">
                    {address ? loading === "pending" ?
                        <Spinner data-icon="inline-start" />
                        : "Update Address"
                        : "Add Address"}
                </Button>

            </form>
        </div>
    )
}

export default Address
