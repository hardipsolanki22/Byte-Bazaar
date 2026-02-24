import React, { useEffect } from 'react'
import { Button } from '../../../components/lightswind/button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Delete, PencilIcon } from 'lucide-react'
import { deleteHeroBanner, getHeroBanners } from '../../../features/admin/heroBanner/heroBannerSlice'
import { toast } from 'sonner'

const HeroBanner = () => {
    const banners = useAppSelector(({ banner }) => banner.banners)
    const loading = useAppSelector(({ banner }) => banner.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleCategoryDelete = (bannerId: string) => {
        dispatch(deleteHeroBanner(bannerId))
            .unwrap()
            .then((data) => {
                toast.success(data.message)
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    useEffect(() => {
        if (!banners?.length) dispatch(getHeroBanners())
    }, [dispatch])

    if (loading === "pending" && !banners?.length) {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!banners?.length) {
        return (
            <div className='w-full flex items-center justify-center text-center h-full'>
                <h2 className='text-2xl text-slate-600 font-semibold'>
                    No Coupons Found
                </h2>
            </div>
        )
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between mx-2 my-4 w-full px-2'>
                <h2 className='text-2xl font-semibold'>Banner Management</h2>
                <Button
                    onClick={() => navigate("/admin/add-banner")}
                    className='cursor-pointer'>
                    Add New Banner
                </Button>
            </div>
            <div className='p-4 mx-2 my-4 bg-white rounded-md 
            w-full h-fit flex flex-col gap-4 items-center '>
                <h2 className="text-3xl font-semibold">Hero Banners</h2>
                <div className='w-full flex flex-col gap-4'>
                    {banners?.map((banner, idx) => (
                        <div
                            key={banner._id}
                            className='w-full flex justify-between border border-slate-400 p-4 rounded-md'>
                            <div className='w-full p-4 '>
                                <img
                                    src={banner.image}
                                    alt={`Banner-${idx}`}
                                    className='w-full h-36 '
                                />
                            </div>
                            <div className='space-x-4 flex '>
                                <Button
                                    onClick={() => navigate(`/admin/banner/${banner._id}`)}
                                    variant='github' className='cursor-pointer'>
                                    <PencilIcon height={20} width={20} />Edit
                                </Button>
                                <Button
                                    onClick={() => handleCategoryDelete(banner._id)}
                                    variant='destructive' className='cursor-pointer'>
                                    <Delete height={20} width={20} />Delete
                                </Button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroBanner
