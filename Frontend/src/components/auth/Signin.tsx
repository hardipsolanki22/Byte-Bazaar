import React from "react";
import { Input } from "../lightswind/input";
import { Link } from "react-router-dom";
import { Button } from "../lightswind/button";
import { Label } from "../lightswind/label";

const SignIn: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center ">
            <div className="p-4 mt-4 bg-white rounded-md lg:w-1/3 w-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">Welcome to ByteBazaar</h2>
                    <p className="mt-2 text-slate-500">Sign in to access your account</p>
                </div>
                <div>
                    <form className="flex flex-col mt-6 gap-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="email"
                                className="focus:outline-none mt-2"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Link to={"/forgot-password"}
                                    className="text-sm"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                className="focus:outline-none mt-2"
                            />
                        </div>
                        <Button className="cursor-pointer">
                            Login
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