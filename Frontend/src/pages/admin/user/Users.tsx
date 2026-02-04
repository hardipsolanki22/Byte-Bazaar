import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/lightswind/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../components/lightswind/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/lightswind/dialog'
import { Button } from '../../../components/lightswind/button'

const Users: React.FC = () => {
    const [role, setRole] = useState("")
    return (
        <div className='w-full'>
            <Table className='m-4'>
                <TableCaption>A list of your recent users.</TableCaption>
                <TableHeader>
                    <TableRow className=''>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone No.</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className='flex gap-3 items-center'>
                                <Avatar>
                                    <AvatarImage src="/hardip.jpg" alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className='font-semibold sm:text-lg'>Hardip Solanki</p>
                            </div>

                        </TableCell>
                        <TableCell>hardipsolaki2224@gmail.com</TableCell>
                        <TableCell>93135 54295</TableCell>
                        <TableCell>

                            <select value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <Dialog>
                                <DialogTrigger asChild >
                                    ""
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Assign Admin Role </DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to give admin access ?
                                        </DialogDescription>
                                        <div className='flex justify-end items-center m-2'>
                                            <Button variant='destructive' className='cursor-pointer'>
                                                Give Access
                                            </Button>
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default Users
