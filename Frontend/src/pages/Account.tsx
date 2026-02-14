import React, { useEffect } from "react";
import { Button } from "../components/lightswind/button";
import { DeleteIcon, Pencil } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/lightswind/tabs"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/lightswind/popover";
import Profile from "../components/profile/Profile";
import { Checkbox } from "../components/lightswind/checkbox";
import Address from "../components/address/Address";
import ForgotPasswordReq from "../components/auth/ForgotPasswordReq";
import ChangePassword from "../components/auth/ChangePassword";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../features/user/userSlice";
import { toast } from "sonner";
import { Spinner } from "../components/ui/spinner";
import { deleteAddress, getAddresses } from "../features/address/addressSlice";

const Account: React.FC = () => {
    const loading = useAppSelector(({ users }) => users.loading)
    const userData = useAppSelector(({ users }) => users.userData)
    const addresses = useAppSelector(({ address }) => address.addresses)
    const addLoading = useAppSelector(({ address }) => address.loading)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // get addresses
    useEffect(() => {
        if (!addresses?.length) dispatch(getAddresses())
    }, [])

    // const addresses = [
    //     {
    //         line1: "123 Main Street, Apt 4B",
    //         city: "New York",
    //         country: "United States",
    //         pincode: "10001"
    //     },
    //     {
    //         line1: "456 Elm Street, Suite 12",
    //         city: "Los Angeles",
    //         country: "United States",
    //         pincode: "90001"
    //     }
    // ]

    const logoutHandler = () => {
        dispatch(logOutUser())
            .unwrap()
            .then((data) => {
                toast.success(data.message)
                navigate('/signin')
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    const handleAddrsDelete = (addressId: string) => {
        dispatch(deleteAddress(addressId))
            .unwrap()
            .then((data) => {
                toast.success(data.message)
            })

    }

    return (
        <div className="flex flex-col justify-center my-5">
            <div className="w-full flex items-center justify-center  rounded-md p-4">
                <Tabs defaultValue="account" className="flex flex-col items-center justify-center gap-4" >
                    <TabsList className="gap-10 bg-white p-5" >
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className=" ">
                        <div className="bg-white p-4 rounded-md w-full flex flex-col justify-center 
                        border border-slate-300 text-center">
                            <div className="mb-4 border-b pb-4 border-slate-300">
                                <h2 className="text-2xl font-semibold my-2">Account Details</h2>
                                <p className="text-slate-600">Manage your account details here</p>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-4 justify-center my-4 w-fit items-center 
                             p-4 ">
                                    <div className="flex items-center justify-center">
                                        <img src={userData?.avatar} alt={userData?.fullName}
                                            className="w-30 h-30 rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col">

                                        <p className="mt-2 text-lg">
                                            <span className=" mr-2">Full Name: </span>
                                            {userData?.fullName}
                                        </p>

                                        <p className="text-lg">
                                            <span className=" mr-2">Email: </span>
                                            {userData?.email}
                                        </p>

                                        <p className="text-lg">
                                            <span className="mr-2">Phone Number: </span>
                                            {userData?.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                                {/* Popup */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="mt-4 cursor-pointer">
                                            <Pencil className="mr-2" size={16} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent >
                                        <Profile />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="addresses">
                        <div className="bg-white p-4 rounded-md w-full flex flex-col justify-center 
                        border border-slate-300 relative">
                            <div className="mb-4 border-b pb-4 border-slate-300 text-center">
                                <h2 className="text-2xl font-semibold my-2">Addresses</h2>
                                <p className="text-slate-600">Manage your addresses.</p>
                            </div>
                            <div className="flex flex-col gap-4 justify-center my-4 w-full items-start relative
                             p-4 ">
                                {!!addresses?.length && addresses.map((address) => (
                                    <div
                                        key={address._id}
                                        className="p-4 border border-slate-400 rounded-md w-full flex justify-between">
                                        <div
                                            className="flex flex-col ">
                                            <div className="flex items-center space-x-2 my-2">
                                                <Checkbox id={`primary-${address._id}`} />
                                                <label
                                                    htmlFor={`primary-${address._id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                            peer-disabled:opacity-70"
                                                >Set as Primary
                                                </label>
                                            </div>
                                            <p className="mt-2 text-lg">{address.addressLine}</p>
                                            <p className="text-lg">{address.country} </p>
                                            <p className="text-lg">{address.state} </p>
                                            <p className="text-lg">{address.city} </p>
                                            <p className="text-lg">{address.pincode}</p>
                                        </div>
                                        {/* Popup */}
                                        <div className="flex flex-col h-full gap-4">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="ghost" className="mt-4 cursor-pointer">
                                                        <Pencil className="mr-2" size={16} />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent >
                                                    <Address address={address} />
                                                </PopoverContent>
                                            </Popover>
                                            <Button
                                                onClick={() => handleAddrsDelete(address._id)}
                                                variant="ghost" className="mt-4 cursor-pointer">
                                                <DeleteIcon className="mr-2" size={16} />
                                            </Button>
                                        </div>
                                    </div>

                                ))}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="cursor-pointer mt-3">
                                            Add New Address
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent >
                                        <Address />
                                    </PopoverContent>
                                </Popover>

                            </div>

                        </div>
                    </TabsContent>
                    <TabsContent value="security">
                        <div className="bg-white p-4 rounded-md flex flex-col justify-center 
                        border border-slate-300 relative">
                            <div className="mb-4 border-b pb-4 border-slate-300 text-center flex flex-col items-center justify-center">
                                <h2 className="text-2xl font-semibold my-2">Security</h2>
                                <p className="text-slate-600">Manage your account security settings.</p>
                            </div>
                            <div className="flex flex-col gap-4 my-4 relative p-4 ">
                                <ChangePassword />
                                <div
                                    className="p-4 border border-slate-400 rounded-md flex flex-col w-full">
                                    <div className="flex flex-col w-fit gap-4">
                                        <div className="flex flex-col text-center">
                                            <h2 className="text-2xl font-semibold my-1"> Forgot Password </h2>
                                            <p className="text-slate-600">Reset your password if you've forgotten it.</p>
                                        </div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button className="cursor-pointer w-full">
                                                    Forgot Password
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent >
                                                <ForgotPasswordReq />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div
                                    className="p-4 border border-slate-400 rounded-md flex flex-col w-full">
                                    <div className="flex flex-col w-fit gap-4">
                                        <div className="flex flex-col text-center">
                                            <h2 className="text-2xl font-semibold my-1">Logout </h2>
                                            <p className="text-slate-600">Sign out of your account on this device.</p>
                                        </div>
                                        <Button

                                            onClick={logoutHandler}
                                            variant="destructive"
                                            className="cursor-pointer px-6 w-full">
                                            {loading === "pending" ?
                                                <Spinner data-icon="inline-start" />
                                                : "Logout"
                                            }
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )


}

export default Account