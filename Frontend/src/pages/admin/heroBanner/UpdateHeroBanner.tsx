import  { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getHeroBanners } from '../../../features/heroBanner/heroBannerSlice';
import HeroBannerForm from '../../../components/admin/HeroBannerForm';
import AppLoader from '../../../components/AppLoader';

const UpdateHeroBanner = () => {
    const { bannerId } = useParams();
    if (!bannerId) return
    const loading = useAppSelector(({ banner }) => banner.loading)
    const banners = useAppSelector(({ banner }) => banner.banners)
    const banner = banners?.find(banner => banner._id === bannerId)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!banners?.length) {
            dispatch(getHeroBanners())
        }
    }, [dispatch])

    return loading === "pending" && !!!banners?.length ? <AppLoader /> : (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-full sm:w-md'>
                <HeroBannerForm
                    {...banner}
                />
            </div>
        </div>
    )
}

export default UpdateHeroBanner
