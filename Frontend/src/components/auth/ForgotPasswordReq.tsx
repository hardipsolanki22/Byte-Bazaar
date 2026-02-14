import React from 'react'
import { Input } from '../lightswind/input'
import { Button } from '../lightswind/button'
import { Label } from '../lightswind/label'
import { Spinner } from '../ui/spinner'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { forgotPasswordReq } from '../../features/user/userSlice'
import { toast } from 'sonner'

type Input = {
    email: string
}
const ForgotPasswordReq: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Input>()
    const dispatch = useAppDispatch()
    const loading = useAppSelector(({ users }) => users.loading)

    const onSubmit: SubmitHandler<Input> = (data) => {
        dispatch(forgotPasswordReq(data))
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
        <div className="flex justify-center flex-col w-full sm:w-[70vw] lg:w-[40vw]">
            <form
                className="flex flex-col mt-6 gap-4">
                <div>
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
                <Button
                    type='button'
                    onClick={handleSubmit(onSubmit)}
                    className="cursor-pointer">
                    {loading === "pending" ?
                        <Spinner data-icon="inline-start" />
                        : " Send Reset Link"
                    }

                </Button>
            </form>
        </div>
    )
}

export default ForgotPasswordReq
