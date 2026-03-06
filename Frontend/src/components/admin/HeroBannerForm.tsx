import { useState } from 'react'
import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'
import { Button } from '../lightswind/button'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { HeroBanerFormData } from '../../types/heroBannerTypes'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { addHeroBanner, updateHeroBanner } from '../../features/heroBanner/heroBannerSlice'
import { Spinner } from '../ui/spinner'

interface HeroBanerProps {
    _id?: string
    image?: string
}
const HeroBannerForm = ({
    _id,
    image
}: HeroBanerProps) => {
    const loading = useAppSelector(({ banner }) => banner.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [imageShow, setImageShow] = useState<string>(image ?? "");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<HeroBanerFormData>()

    const onSubmit: SubmitHandler<HeroBanerFormData> = (data) => {
        const heroBanner = data.heroBanner[0]
        if (_id && image) {
            dispatch(updateHeroBanner({ bannerId: _id, data: { heroBanner } }))
                .unwrap()
                .then((data) => {
                    navigate("/admin/banner")
                    toast.success(data.message, {
                        position: "top-center"
                    })
                })
                .catch((error) => {
                    toast.success(error.message, {
                        position: "top-center"
                    })
                })
        } else {
            dispatch(addHeroBanner({ heroBanner }))
                .unwrap()
                .then((data) => {
                    navigate("/admin/banner")
                    toast.success(data.message, {
                        position: "top-center"
                    })
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: "top-center"
                    })
                })
        }
    }

    return (
        <div className="p-4 w-full">
            <div className="text-center">
                <h2 className="text-3xl font-semibold">New Hero Banner</h2>
                {/* <p className="mt-2 text-slate-500">Add new Categoty</p> */}
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mt-6 gap-4">
                    <div>
                        {imageShow &&
                            <div className='p-2 border mb-2 border-slate-200 rounded-md w-full'>
                                <img src={imageShow} alt="bannerImage"
                                    className='w-full h-36 rounded-b-sm' />
                            </div>
                        }
                        <Label htmlFor="heroBanner">Banner Image</Label>
                        <Input
                            id="heroBanner"
                            type="file"
                            className="my-2"
                            accept="image/png, image/jpeg, image/jpg, image/gif"
                            {...register("heroBanner", {
                                required: !image && "Banner image is required"
                            })}
                            onChange={(e) => {
                                register("heroBanner").onChange(e)
                                e.target.files?.[0] && setImageShow(URL.createObjectURL(e.target.files[0]))
                            }}
                        />
                        {errors.heroBanner && <span className="text-red-500 m-2">{errors.heroBanner.message}</span>}

                    </div>
                    <Button
                        type='submit'
                        className="cursor-pointer">
                        {loading === "pending" ?
                            <Spinner data-icon="inline-start" />
                            : "Submit"
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default HeroBannerForm
