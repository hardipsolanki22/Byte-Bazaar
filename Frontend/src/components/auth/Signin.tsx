import React, { useEffect, useRef } from "react";
import { Input } from "../lightswind/input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../lightswind/button";
import { Label } from "../lightswind/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Spinner } from "../ui/spinner";
import { currentUser, loginUser } from "../../features/user/userSlice";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../lightswind/popover";
import ForgotPasswordReq from "./ForgotPasswordReq";
import { CONFIG } from "../../config/constants";

type Inputs = {
    email: string;
    password: string
}
const SignIn: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loading = useAppSelector(({ users }) => users.loading)
    const [searchParams] = useSearchParams();
    const hasShownError = useRef(false);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(loginUser(data))
            .unwrap()
            .then((userData) => {
                if (userData) {
                    dispatch(currentUser())
                        .unwrap()
                        .then(() => {
                            navigate("/")
                            toast.success(userData.message)
                        })
                }
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    const handleAuthGoogle = () => {
        window.open(CONFIG.GOOGLE_REDIRECT_URL, "_self")
    }
    const handleAuthFacebook = () => {
        window.open(CONFIG.FACEBOOK_REDIRECT_URL, "_self")
    }


    useEffect(() => {
        if (hasShownError.current) return;

        const error = searchParams.get('error');
        const message = searchParams.get('message');

        if (error && message) {
            const decodedMessage = decodeURIComponent(message);
            toast.error(decodedMessage, {
                position: 'top-center',
                duration: 6000
            });

            hasShownError.current = true;
            window.history.replaceState({}, '', '/signin');
        }
    }, [searchParams]);
    return (
        <div className="flex flex-col min-h-screen items-center justify-center ">
            <div className="p-4 mt-4 bg-white rounded-md w-auto xl:w-1/3">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">Welcome to ByteBazaar</h2>
                    <p className="mt-2 text-slate-500">Sign in to access your account</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}
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
                        <div>
                            <div className="flex justify-between items-center mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Popover closeOnOutsideClick={false}>
                                    <PopoverTrigger asChild>
                                        <span
                                            className="text-sm cursor-pointer"
                                        >
                                            Forgot your password?
                                        </span>
                                    </PopoverTrigger>
                                    <PopoverContent >
                                        <ForgotPasswordReq />
                                    </PopoverContent>
                                </Popover>
                            </div>
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
                        <Button type="submit"
                            className="cursor-pointer">
                            {loading === "pending" ?
                                <Spinner data-icon="inline-start" />
                                : "Signin"
                            }
                        </Button>
                        <div className="flex items-center">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <p className="text-center px-2">or continue with</p>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button
                                type="button"
                                onClick={handleAuthGoogle}
                                variant="outline"
                                className="cursor-pointer w-full flex items-center justify-center gap-2">
                                <img src="/google-logo.jpg" alt="Google Logo" className="w-5 h-5" />
                                Sign in with Google
                            </Button>
                            <Button
                                type="button"
                                onClick={handleAuthFacebook}
                                variant="outline"
                                className="cursor-pointer w-full flex items-center justify-center gap-2">
                                <img src="/facebook-logo.png" alt="Facebook Logo" className="w-5 h-5" />
                                Sign in with Facebook
                            </Button>
                        </div>
                        <p>
                            Don't have an account?{" "}
                            <Link to={"/signup"} className="text-blue-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn