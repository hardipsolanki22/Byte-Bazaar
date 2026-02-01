import React from 'react'
import { Button } from '../lightswind/button'
import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'

const Profile: React.FC = () => {
    return (
        <div className='flex justify-center flex-col w-full sm:w-[70vw] lg:w-[40vw] '>
            <div className="mb-4 border-b py-2 border-slate-300 text-center ">
                <h2 className="text-2xl font-semibold">User Details</h2>
            </div>
            <div>
                <div className='flex items-center justify-center'>
                    <img src="./hardip.jpg" alt="avatar"
                        className='w-30 h-30 rounded-full' />
                </div>
                <form className="flex flex-col gap-4">
                    <div className='text-start'>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                            id="full_name"
                            type="text"
                            placeholder="full name"
                            className="focus:outline-none mt-2"
                        />
                    </div>
                    <div className='text-start'>
                        <Label htmlFor="phone_no">Phone No.</Label>
                        <Input
                            id="phone_no"
                            type="number"
                            placeholder="+91 "
                            className="focus:outline-none mt-2"
                        />
                    </div>
                    <div className='text-start'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="email"
                            className="focus:outline-none mt-2"
                        />
                    </div>
                    <div className='text-start'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            className="focus:outline-none mt-2"
                        />
                    </div>

                    <Button className="cursor-pointer">
                        Update
                    </Button>

                </form>

            </div>

        </div>
    )
}

export default Profile
