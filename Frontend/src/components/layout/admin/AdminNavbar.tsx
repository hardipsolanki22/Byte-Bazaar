import React from 'react'
import { Button } from '../../lightswind/button'
import { Link, useNavigate } from 'react-router-dom'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../lightswind/hover-card'
import { Avatar, AvatarImage } from '../../lightswind/avatar'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { logOutUser } from '../../../features/user/userSlice'
import { toast } from 'sonner'

const AdminNavbar = () => {
  const user = useAppSelector(({ users }) => users.userData)
  const loading = useAppSelector(({ users }) => users.loading)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  const logoutHandler = () => {
    dispatch(logOutUser())
      .unwrap()
      .then((data) => {
        console.log("data: ", data)
        toast.success(data.message)
        navigate("/signin")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return (
    <nav className='hidden md:flex justify-between px-4 items-center bg-white border-b border-gray-200 h-16  '>
      <div className='gap-10 flex items-center justify-center'>
        <Link to="/" className='flex items-center justify-center '>
          <img src="./byteBazaar.png" alt="logo"
            className='w-24 h-24 cursor-pointer' />
        </Link>
      </div>

      <ul>
        <li className='inline-block mx-2'>
          <Button variant='ghost'
            className='cursor-pointer hover:bg-gray-100 '
            onClick={() => { navigate("/") }}>
            Home
          </Button>
        </li>
        <li className='inline-block mx-4'>
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Button variant='link' className='cursor-pointer'>
                <Avatar>
                  <AvatarImage src={user?.avatar} alt={user?.fullName} />
                </Avatar>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="p-2">
                <Link to="/account">
                  <Button variant="ghost" className="w-full text-left mb-2 cursor-pointer">
                    My Account
                  </Button>
                </Link>
                <Link to="/my-orders">
                  <Button variant="ghost" className="w-full text-left mb-2 cursor-pointer">
                    My Orders
                  </Button>
                </Link>
                <Button
                  onClick={logoutHandler}
                  disabled={loading === "pending"}
                  variant="ghost" className="w-full text-left cursor-pointer">
                  Logout
                </Button>

              </div>
            </HoverCardContent>
          </HoverCard>
        </li>

      </ul>
    </nav>
  )
}

export default AdminNavbar
