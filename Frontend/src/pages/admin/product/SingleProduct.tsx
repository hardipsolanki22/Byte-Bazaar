import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/lightswind/button'
import { DivideCircle, Star, MoreVertical } from 'lucide-react'
import { Badge } from '../../../components/lightswind/badge'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/lightswind/hover-card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/lightswind/dialog'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteProduct, getProduct } from '../../../features/admin/product/productSlice'
import { getRating } from '../../../features/rating/ratingSlice'
import { calRatingPercentage } from '../../../helpers/calRatingPercentage'
import { Spinner } from '../../../components/ui/spinner'
import { toast } from 'sonner'

const SingleProduct: React.FC = () => {

    const { slug } = useParams()
    const product = useAppSelector(({ product }) => product.singleProduct)
    const productRating = useAppSelector(({ rating }) => rating.rating)
    const loading = useAppSelector(({ product }) => product.loading)
    const ratingLoading = useAppSelector(({ rating }) => rating.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    if (!slug) return
    useEffect(() => {
        Promise.all([
            dispatch(getProduct(slug)),
            dispatch(getRating(slug))
        ])
    }, [dispatch, slug])


    const [productMainImageUrl, setProductMainImageUrl] = useState<string>(product?.mainImage || "")
    const handleProductDelete = (slug: string) => {
        dispatch(deleteProduct(slug))
            .unwrap()
            .then((userData) => {
                navigate("/admin/products")
                toast.success(userData.message)
            })
    }

    if ((!!!product) && loading === "pending" || loading === "idle"
        || ratingLoading === 'pending' || ratingLoading == 'idle'
    ) {
        return (
            <div className='flex items-center  w-full justify-center h-full'>
                <h1>Loading...</h1>
            </div>
        )
    }
    if (!product) {
        return (
            <div className='w-full flex items-center justify-center text-center h-full'>
                <h2 className='text-2xl text-slate-600 font-semibold'>
                    Products Not Found
                </h2>
            </div>
        )
    }


    return (
        <div className='pt-4 flex flex-col mx-2 w-full'>
            <div className='flex justify-between mx-2 border-b pb-3 border-slate-200'>
                <h2 className='text-2xl font-semibold'>Product Management</h2>
                <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                        <Button variant='link' className='cursor-pointer'>
                            <MoreVertical className='w-4 h-4' />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <Link to={`/admin/products/${slug}/update`}>
                            <Button variant="ghost"
                                className="w-full text-left mb-3 cursor-pointer">
                                Update
                            </Button>
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="w-full text-left cursor-pointer">
                                    Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Product</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. Are you sure you want to delete this product
                                    </DialogDescription>
                                    <div className='flex justify-end items-center m-2'>
                                        <Button
                                            onClick={() => handleProductDelete(slug)}
                                            variant='destructive' className='cursor-pointer'>
                                            {loading === "pending" ?
                                                <Spinner data-icon="inline-start" />
                                                : "Delete"
                                            }
                                        </Button>
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </HoverCardContent>
                </HoverCard>
            </div>

            <div className='rounded-md p-4 m-4 grid grid-cols-1 lg:grid-cols-12 gap-4'>
                <div className='lg:col-span-6'>
                    {/* Product Details Section */}
                    <div className='flex sm:flex-row flex-col-reverse justify-center gap-6'>
                        {!!product?.subImages.length &&
                            <div className='flex sm:flex-col items-center flex-wrap justify-center sm:justify-normal gap-4 sm:mt-4'>
                                {product.subImages.map((imgUrl, idx) => (
                                    <img
                                        onClick={() => setProductMainImageUrl(imgUrl)}
                                        key={idx}
                                        src={imgUrl}
                                        alt={`Product ${idx + 1}`}
                                        className='w-16 h-16 sm:h-20 sm:w-20  object-cover rounded-md hover:scale-105 transition-transform
                     cursor-pointer'
                                    />
                                ))}
                            </div>
                        }
                        <div className='px-4 sm:px-10 border rounded-sm border-slate-400'>
                            <img
                                src={productMainImageUrl || product?.mainImage}
                                alt={product?.name}
                                className="w-[30rem] h-[30rem] object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-6 lg:max-h-screen lg:overflow-y-auto'>
                    <div className='flex flex-col-reverse lg:flex-col mb-4 border-b border-slate-300 sm:border-none'>
                        <div className='flex flex-col justify-center p-4 rounded-md sm:border border-slate-200'>
                            <h2 className='text-3xl text-slate-700 font-bold mb-2 '>{product?.name}</h2>
                            <p className='text-slate-600 mb-2'>{product?.description}</p>
                            <p className='text-xl font-semibold mb-2 text-slate-700'>{product?.price}</p>
                            <div className='flex items-center mb-2'>
                                {product?.stock && product?.stock > 5 ? <Badge variant={'success'}>In Stock</Badge>
                                    : <Badge variant={'destructive'}>Low Stock</Badge>}
                            </div>
                            <div className='flex items-center'>
                                <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1 mr-2'>
                                    <Star className='w-4 h-4 fill-white text-white' />
                                    <span className='text-white font-medium'>{product?.productRating.averageRating}</span>
                                </div>
                                <span className='text-slate-500'>({product?.productRating.totalRatings} reviews)</span>
                            </div>
                        </div>
                    </div>
                    {/* Rating Section */}
                    {!!!productRating ? (
                        <div className='flex w-full justify-center items-center h-full'>
                            <h2 className='text-2xl text-slate-600 font-semibold'>
                                No Rating Available
                            </h2>
                        </div>
                    ) : (
                        <div className='sm:border rounded-md border-slate-200 p-4 flex sm:items-start
         flex-col'>
                            <div className='border-b pb-4 sm:w-full border-slate-300 '>
                                <h2 className='sm:text-xl font-semibold '>
                                    Product Ratings & Reviews
                                </h2>
                                <div className='flex items-center flex-col sm:flex-row justify-around m-4'>
                                    <div className='flex flex-col items-center justify-center mb-4 sm:mb-0'>
                                        <div className='flex items-center justify-center my-2'>
                                            <h2 className='text-xl sm:text-4xl font-semibold mt-2'>{product?.productRating.averageRating}</h2>
                                            <Star className='w-5 h-5 fill-yellow-400 text-yellow-400 ml-1' />
                                        </div>
                                        <p className='text-slate-400 text-sm'>{product?.productRating.totalRatings} Ratings,</p>
                                        <p className='text-slate-400 text-sm'>{product?.productRating.totalReviews} Reviews</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <DivideCircle className='w-1 h-32 ml-4 text-slate-300' />
                                        <div>
                                            <div className='flex items-center gap-2 my-1'>
                                                <span className='text-sm text-slate-500 w-16'>Excellent</span>
                                                <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                                                    <div className='h-4 bg-green-500 rounded-full'
                                                        style={{ width: `${calRatingPercentage(productRating.excellent ?? 0, product?.productRating.totalRatings ?? 0)}` }}>
                                                    </div>
                                                </div>
                                                <span className='text-sm text-slate-500 w-8 text-right'>
                                                    {calRatingPercentage(productRating.excellent ?? 0, product?.productRating.totalRatings ?? 0)}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2 my-1'>
                                                <span className='text-sm text-slate-500 w-16'>Good</span>
                                                <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                                                    <div className='h-4 bg-blue-500 rounded-full'
                                                        style={{ width: `${calRatingPercentage(productRating.good ?? 0, product?.productRating.totalRatings ?? 0)}` }}>
                                                    </div>
                                                </div>
                                                <span className='text-sm text-slate-500 w-8 text-right'>
                                                    {calRatingPercentage(productRating.good ?? 0, product?.productRating.totalRatings ?? 0)}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2 my-1'>
                                                <span className='text-sm text-slate-500 w-16'>Average</span>
                                                <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                                                    <div className='h-4 bg-yellow-500 rounded-full'
                                                        style={{ width: `${calRatingPercentage(productRating.average ?? 0, product?.productRating.totalRatings ?? 0)}` }}>
                                                    </div>
                                                </div>
                                                <span className='text-sm text-slate-500 w-8 text-right'>
                                                    {calRatingPercentage(productRating.average ?? 0, product?.productRating.totalRatings ?? 0)}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2 my-1'>
                                                <span className='text-sm text-slate-500 w-16'>Poor</span>
                                                <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                                                    <div className='h-4 bg-orange-500 rounded-full'
                                                        style={{ width: `${calRatingPercentage(productRating.poor ?? 0, product?.productRating.totalRatings ?? 0)}` }}>

                                                    </div>
                                                </div>
                                                <span className='text-sm text-slate-500 w-8 text-right'>
                                                    {calRatingPercentage(productRating.poor ?? 0, product?.productRating.totalRatings ?? 0)}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2 my-1'>
                                                <span className='text-sm text-slate-500 w-16'>Terrible</span>
                                                <div className='w-40 h-4 bg-slate-200 rounded-full overflow-hidden'>
                                                    <div className='h-4 bg-red-500 rounded-full'
                                                        style={{ width: `${calRatingPercentage(productRating.terrible ?? 0, product?.productRating.totalRatings ?? 0)}` }}>

                                                    </div>
                                                </div>
                                                <span className='text-sm text-slate-500 w-8 text-right'>
                                                    {calRatingPercentage(productRating.terrible ?? 0, product?.productRating.totalRatings ?? 0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!!productRating && productRating.users.map((rataingUser) => (
                                <div key={rataingUser._id}
                                    className='mt-4 flex items-start flex-col border-b border-slate-300 pb-4 w-full'>
                                    <div className='flex items-center gap-4 '>
                                        <img
                                            src={rataingUser.user.avatar}
                                            alt={rataingUser.user.fullName}
                                            className="w-10 h-10 rounded-full" />
                                        <h3 className='text-slate-400 text-sm'>
                                            {rataingUser.user.fullName}
                                        </h3>
                                    </div>
                                    <div className='m-3 rounded-lg flex items-center gap-2'>
                                        <div className='flex items-center mt-2'>
                                            <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1'>
                                                <span className='text-white'>
                                                    {String(rataingUser.rating)}
                                                </span>
                                                <Star size={16} color='white' />
                                            </div>
                                        </div>
                                        <div className='bg-slate-400 rounded-full p-[2px]'></div>
                                        <span className='text-slate-400 text-sm'>
                                            {new Date(rataingUser.createdAt).toLocaleDateString('gu-IN')}
                                        </span>
                                    </div>
                                    <p className='mt-2 text-slate-600'>
                                        {rataingUser?.comment}
                                    </p>
                                </div>
                            ))}
                            {/* <div className='mt-4 flex items-start flex-col'>
                                <div className='flex items-center gap-4 '>
                                    <img src="" alt="user avatar" className="w-10 h-10 rounded-full" />
                                    <h3 className='text-slate-400 text-sm'>
                                        John Doe
                                    </h3>
                                </div>
                                <div className='m-3 rounded-lg flex items-center gap-2'>
                                    <div className='flex items-center mt-2'>
                                        <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1'>
                                            <span className='text-white'>
                                                {product?.productRating.averageRating}
                                            </span>
                                            <Star size={16} color='white' />
                                        </div>
                                    </div>
                                    <div className='bg-slate-400 rounded-full p-[2px]'></div>
                                    <span className='text-slate-400 text-sm'>Posted on 14 Oct 2025</span>

                                </div>
                                <p className='mt-2 text-slate-600'>
                                    This product is amazing! I highly recommend it.
                                </p>
                            </div>
                            <div className='mt-4 flex items-start flex-col'>
                                <div className='flex items-center gap-4 '>
                                    <img src="" alt="user avatar" className="w-10 h-10 rounded-full" />
                                    <h3 className='text-slate-400 text-sm'>
                                        John Doe
                                    </h3>
                                </div>
                                <div className='m-3 rounded-lg flex items-center gap-2'>
                                    <div className='flex items-center mt-2'>
                                        <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1'>
                                            <span className='text-white'>
                                                {product?.productRating.averageRating}
                                            </span>
                                            <Star size={16} color='white' />
                                        </div>
                                    </div>
                                    <div className='bg-slate-400 rounded-full p-[2px]'></div>
                                    <span className='text-slate-400 text-sm'>Posted on 14 Oct 2025</span>

                                </div>
                                <p className='mt-2 text-slate-600'>
                                    This product is amazing! I highly recommend it.
                                </p>
                            </div> */}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default SingleProduct
