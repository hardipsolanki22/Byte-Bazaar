import React from 'react'
import { Button } from '../lightswind/button'
import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { currentUser, updateAvatar, updateDetails } from '../../features/user/userSlice'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../ui/spinner'

type Inputs = {
    fullName: string;
    email: string;
    phoneNumber: number;
    avatar?: FileList | null
}

const Profile: React.FC = () => {
    const user = useAppSelector(({ users }) => users.userData)
    const loading = useAppSelector(({ users }) => users.loading)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            fullName: user?.fullName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
        }
    })
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (data.avatar?.length) {
            dispatch(updateAvatar({ avatar: data.avatar[0] }))
                .unwrap()
                .then((userData) => {
                    toast.success(userData.message)
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        } else {
            dispatch(updateDetails(data))
                .unwrap()
                .then((userData) => {
                    toast.success(userData.message)
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <div className='flex justify-center flex-col w-full sm:w-[70vw] lg:w-[40vw] '>
            <div className="mb-4 border-b py-2 border-slate-300 text-center ">
                <h2 className="text-2xl font-semibold">User Details</h2>
            </div>
            <div>
                <div className='flex items-center justify-center'>
                    <img src={user?.avatar} alt={user?.fullName}
                        className='w-30 h-30 rounded-full' />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4">
                    <div className='text-start'>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                            id="full_name"
                            type="text"
                            placeholder="full name"
                            className="focus:outline-none mt-2"
                            {...register("fullName", { required: "Full name is required" })}
                        />
                        {errors.fullName && <span className="text-red-500 m-2">{errors.fullName.message}</span>}

                    </div>
                    <div className='text-start'>
                        <Label htmlFor="phone_no">Phone No.</Label>
                        <Input
                            id="phone_no"
                            type="number"
                            placeholder="+91 "
                            className="focus:outline-none mt-2"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                                validate: {
                                    matchPattern: (value) => /^(\+91|0)?[6-9]\d{9}$/.test(String(value))
                                        || "Please enter a valid 10-digit Indian mobile number",
                                }
                            })}
                        />
                        {errors.phoneNumber && <span className="text-red-500 m-2">{errors.phoneNumber.message}</span>}

                    </div>
                    <div className='text-start'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="email"
                            className="focus:outline-none mt-2"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                        || "Email address must be a valid address.",
                                }
                            })}
                        />
                        {errors.email && <span className="text-red-500 m-2">{errors.email.message}</span>}
                    </div>
                    <div className='text-start'>
                        <Label htmlFor="avatar">Avatar</Label>
                        <Input
                            id="avatar"
                            type="file"
                            className="mt-2"
                            accept="image/png, image.gpeg image/jpg image/gif"
                            {...register("avatar")}
                        />
                    </div>

                    <Button className="cursor-pointer">
                        {loading === "pending" ?
                            <Spinner data-icon="inline-start" />
                            : "Update"
                        }
                    </Button>

                </form>

            </div>

        </div>
    )
}

export default Profile
