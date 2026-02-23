import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/lightswind/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../components/lightswind/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/lightswind/dialog'
import { Button } from '../../../components/lightswind/button'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { assignRole, getUsersList } from '../../../features/admin/user/userSlice'
import { toast } from 'sonner'
import { Spinner } from '../../../components/ui/spinner'

const Users: React.FC = () => {
    const users = useAppSelector(({ userList }) => userList.users)
    const loading = useAppSelector(({ userList }) => userList.loading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!users.length) {
            dispatch(getUsersList())
        }
    }, [dispatch])

    if (!users.length && loading === "pending") {
        return (
            <div className='flex items-center w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }

    const assignUserRole = (userId: string, role: "USER" | "ADMIN") => {
        dispatch(assignRole({ userId, role }))
            .unwrap()
            .then((userData) => {
                toast.success(userData.message)
            })
    }

    return (
        <div className='w-full p-4'>
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
                    {users.map((user) => (
                        <TableRow
                            key={user._id}
                        >
                            <TableCell>
                                <div className='flex gap-3 items-center'>
                                    <Avatar>
                                        <AvatarImage src={user.avatar} alt={user.fullName}
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p className='font-semibold sm:text-lg'>
                                        {user.fullName}
                                    </p>
                                </div>

                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phoneNumber}</TableCell>
                            <TableCell>
                                {user.role}
                                <Dialog>
                                    <DialogTrigger asChild >
                                        <div className='flex  flex-col mt-3 relative sm:right-3 lg:right-10'>
                                            {user.role === "ADMIN" ? (
                                                <Button
                                                    variant='outline'
                                                    className='w-fit cursor-pointer'
                                                >
                                                    Revoke Admin Access
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant='outline'
                                                    className='w-fit cursor-pointer'
                                                >
                                                    Give Admin Access
                                                </Button>
                                            )}
                                        </div>
                                    </DialogTrigger>
                                    {/* Dialog content for giving or revoking admin access */}
                                    {user.role === "ADMIN" ? (
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Revoke Admin Role</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to revoke admin access ?
                                                </DialogDescription>
                                                <div className='flex justify-end items-center m-2'>
                                                    <Button
                                                        onClick={() => assignUserRole(user._id, "USER")}
                                                        variant='destructive' className='cursor-pointer'>
                                                        {loading === "pending" ?
                                                            <Spinner data-icon="inline-start" />
                                                            : "Revoke Admin Access"
                                                        }
                                                    </Button>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    ) : (
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Assign Admin Role </DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to give admin access ?
                                                </DialogDescription>
                                                <div className='flex justify-end items-center m-2'>
                                                    <Button
                                                        onClick={() => assignUserRole(user._id, "ADMIN")}
                                                        variant='destructive' className='cursor-pointer'>
                                                        {loading === "pending" ?
                                                            <Spinner data-icon="inline-start" />
                                                            : "Give Access"
                                                        }
                                                    </Button>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    )}
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))

                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default Users
