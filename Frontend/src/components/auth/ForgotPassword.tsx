import React from 'react'
import { Input } from '../lightswind/input'
import { Button } from '../lightswind/button'
import { Label } from '../lightswind/label'

const ForgotPassword: React.FC = () => {
    return (
        <div className="flex justify-center flex-col w-full sm:w-[70vw] lg:w-[40vw]">
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
                <Button className="cursor-pointer">
                    Send Reset Link
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword
