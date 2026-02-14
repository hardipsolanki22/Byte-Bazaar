import { Input } from "../lightswind/input";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../lightswind/button";
import { Label } from "../lightswind/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Spinner } from "../ui/spinner";
import { forgotPassword } from "../../features/user/userSlice";
import { toast } from "sonner";


type Inputs = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
const ForgotPassowrd = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loading = useAppSelector(({ users }) => users.loading)
    const { forgotPasswordToken } = useParams();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (forgotPasswordToken) {
            dispatch(forgotPassword({ forgotPasswordToken, updatePasswordData: data }))
                .unwrap()
                .then((userData) => {
                    toast.success(userData.message)
                    navigate("/signin")
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }
    return (
        <div className="flex flex-col min-h-screen items-center justify-center ">
            <div className="p-4 mt-4 bg-white rounded-md w-auto xl:w-1/3">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">Forgot Password</h2>
                    <p className="mt-2 text-slate-500">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mt-6 gap-4">
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

                        <Button type="submit"
                            className="cursor-pointer">
                            {loading === "pending" ?
                                <Spinner data-icon="inline-start" />
                                : "Update Password"
                            }
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ForgotPassowrd
