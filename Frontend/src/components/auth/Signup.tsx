import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form"

import { Input } from "../lightswind/input";
import { Button } from "../lightswind/button";
import { Label } from "../lightswind/label";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/user/userSlice";
import { toast } from "sonner"
import { Spinner } from "../ui/spinner";

type Inputs = {
    fullName: string;
    email: string;
    phoneNumber: number;
    password: string
    avatar: FileList
}

const SignUp: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loading = useAppSelector(({ users }) => users.loading)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(registerUser({ ...data, avatar: data.avatar[0] }))
            .unwrap()
            .then((userData) => {
                navigate("/signin")
                console.log("userdata: ", userData)
                toast.success(userData.message)
            })
            .catch((error) => {
                console.log("errpr: ", error)
                toast.error(error.message)
            })
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center ">
            <div className="p-4 mt-4 bg-white rounded-md w-auto xl:w-1/3 ">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">Welcome to ByteBazaar</h2>
                    <p className="mt-2 text-slate-500">Sinup to create an account</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mt-6 gap-4">
                        <div>
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
                        <div>

                            <div className="flex gap-4">
                                <div className="flex flex-col gap-5 w-[30%] border-b border-slate-200 mr-2 items-center">
                                    <span className=" text-sm">
                                        Country
                                    </span>
                                    {/* <span className="font-semibold"> */}
                                    <Label htmlFor="phone_no">IN +91</Label>

                                    {/* </span> */}
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="phone_no">Phone No.</Label>
                                    <Input
                                        id="phone_no"
                                        type="number"
                                        placeholder="Phone Number"
                                        className="focus:outline-none mt-2"
                                        {...register("phoneNumber", {
                                            required: "Phone number is required",
                                            validate: {
                                                matchPattern: (value) => /^(\+91|0)?[6-9]\d{9}$/.test(String(value))
                                                    || "Please enter a valid 10-digit Indian mobile number",
                                            }

                                        })}
                                    />
                                </div>
                            </div>
                            {errors.phoneNumber && <span className="text-red-500 m-2">{errors.phoneNumber.message}</span>}

                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                className="focus:outline-none mt-2"
                                {...register("password", {
                                    required: "Password is required",
                                    validate: {
                                        matchPatern: (value) => /^(?=.{8,})/gm.test(value)
                                            || "Password must be at least 8 characters long.",
                                    }
                                })}
                            />
                            {errors.password && <span className="text-red-500 m-2">{errors.password.message}</span>}

                        </div>
                        <div>
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input
                                id="avatar"
                                type="file"
                                className="mt-2"
                                accept="image/png, image.gpeg image/jpg image/gif"
                                {...register("avatar", { required: "Full name is required" })}
                            />
                            {errors.avatar && <span className="text-red-500 m-2">{errors.avatar.message}</span>}

                        </div>
                        <Button
                            disabled={loading === "pending"}

                            type="submit"
                            className="cursor-pointer">
                            {loading === "pending" ?
                                <Spinner data-icon="inline-start" />
                                : "Signup"
                            }

                        </Button>
                        <div className="flex items-center">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <p className="text-center px-2">or continue with</p>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline"
                                className="cursor-pointer w-full flex items-center justify-center gap-2">
                                <img src="/google-logo.jpg" alt="Google Logo" className="w-5 h-5" />
                                Sign in with Google
                            </Button>
                            <Button variant="outline"
                                className="cursor-pointer w-full flex items-center justify-center gap-2">
                                <img src="/facebook-logo.png" alt="Facebook Logo" className="w-5 h-5" />
                                Sign in with Facebook
                            </Button>
                        </div>
                        <p>
                            Do You have an account?{" "}
                            <Link to={"/signin"} className="text-blue-600 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp