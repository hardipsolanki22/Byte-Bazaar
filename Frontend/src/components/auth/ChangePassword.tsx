import React from 'react'
import { Button } from '../lightswind/button'
import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'

const ChangePassword = () => {
    return (
        <div
            className="p-4 border border-slate-400 rounded-md flex 
                                    flex-col  justify-center w-full">
            <div className="w-fit">
                <div className="flex flex-col text-center">
                    <h2 className="text-2xl font-semibold my-1"> Change Password </h2>
                    <p className="text-slate-600">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <form className="flex flex-col mt-6 gap-4 w-full">
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            className="focus:outline-none mt-2"
                        />
                    </div>
                    <Button className="cursor-pointer">
                        Change Password
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
