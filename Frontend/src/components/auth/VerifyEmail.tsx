import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Spinner } from '../ui/spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../../features/user/userSlice'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

const VerifyEmail = () => {
    const { verificationToken } = useParams();
    const verifyEmailStatus = useAppSelector(({ users }) => users.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [successMsg, setSuccessMsg] = useState<string>("")
    const [errorMsg, setErrorMsg] = useState<string>("")



    useEffect(() => {
        if (verificationToken) {
            dispatch(verifyEmail(verificationToken))
                .unwrap()
                .then((data) => {
                    toast.success(data.message)
                    setSuccessMsg(data.message)
                    navigate("/signin")
                })
                .catch((error) => {
                    toast.error(error.message)
                    setErrorMsg(error.message)
                })
        }
    }, [verificationToken])

    return (
        <div className="w-full flex flex-col min-h-screen justify-center items-center">
            {verifyEmailStatus === "idle" &&
                <div className="p-7 rounded-md bg-white flex flex-col items-center 
                justify-center gap-3 h-1/4">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">Verifying your email...</h2>
                        <p className="mt-2 text-slate-500">Please wait while we verify your email address</p>
                    </div>
                    <Spinner
                        data-icon="inline-start" />
                </div>
            }

            {verifyEmailStatus === "succeeded" &&
                <div className="p-7 rounded-md bg-white flex flex-col items-center 
                justify-center gap-3 h-1/4">
                    <div className="text-center space-y-1">
                        <h2 className="text-3xl font-semibold">Email Verified!</h2>
                        {successMsg && <p className="mt-2 text-slate-500">{successMsg}</p>}
                        <p className="mt-2 text-slate-500"> Redirecting to login in 3 seconds...</p>
                    </div>
                    <Spinner
                        data-icon="inline-start" />
                </div>
            }

            {verifyEmailStatus === "failed" &&
                <div className="p-7 rounded-md bg-white flex flex-col items-center 
                justify-center gap-3 w-1/3">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">Verification Failed</h2>
                        {errorMsg && <p className="mt-2 text-slate-500">{errorMsg}</p>}
                    </div>
                </div>
            }

        </div>
    )
}

export default VerifyEmail
