import React from 'react'
import { Button } from '../lightswind/button'
import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Spinner } from '../ui/spinner'
import { changePassword } from '../../features/user/userSlice'

type Inputs = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword = () => {

    const loading = useAppSelector(({ users }) => users.loading)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(changePassword(data))
            .unwrap()
            .then((userData) => {
                toast.success(userData.message)
                reset()
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    return (
        <div
            className="p-4 border border-slate-400 rounded-md flex 
                                    flex-col  justify-center w-full">
            <div className="w-fit">
                <div className="flex flex-col text-center">
                    <h2 className="text-2xl font-semibold my-1"> Change Password </h2>
                    <p className="text-slate-600">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mt-6 gap-4 w-full">
                    <div>
                        <Label htmlFor="oldPassword">Old Password</Label>
                        <Input
                            id="oldPassword"
                            type="password"
                            placeholder="Old password"
                            className="focus:outline-none mt-2"
                            {...register("oldPassword", {
                                required: "Password is required",
                                validate: {
                                    matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                                        || "Password must be at least 8 characters long.",
                                }
                            })}
                        />
                        {errors.oldPassword && <span className="text-red-500 m-2">{errors.oldPassword.message}</span>}

                    </div>
                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="New password"
                            className="focus:outline-none mt-2"
                            {...register("newPassword", {
                                required: "Password is required",
                                validate: {
                                    matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                                        || "Password must be at least 8 characters long.",
                                }
                            })}
                        />
                        {errors.newPassword && <span className="text-red-500 m-2">{errors.newPassword.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            className="focus:outline-none mt-2"
                            {...register("confirmPassword", {
                                required: "Password is required",
                                validate: {
                                    matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                                        || "Password must be at least 8 characters long.",
                                }
                            })}
                        />
                        {errors.confirmPassword && <span className="text-red-500 m-2">{errors.confirmPassword.message}</span>}

                    </div>
                    <Button className="cursor-pointer">
                        {loading === "pending" ?
                            <Spinner data-icon="inline-start" />
                            : "Change Password"
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
