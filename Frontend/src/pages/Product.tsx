import { DivideCircle, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/lightswind/button';
import RelatedProduct from '../components/products/Product';
import { Badge } from '../components/lightswind/badge';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProduct, getProductsByCategory } from '../features/product/productSlice';
import { getRating } from '../features/rating/ratingSlice';
import { calRatingPercentage } from '../helpers/calRatingPercentage';
import { addItemOrUpdateItemQuantity, getUserCart } from '../features/cart/cartSlice';
import { toast } from 'sonner';
import emptyRatings from "../assets/svg/empty-ratings.svg"
import ProductNotFoundWithText from '../assets/ProductNotFound';
import { SingleProductSkeleton } from '../components/skeleton/singleProductSkeleton';

const Product: React.FC = () => {


  const { slug } = useParams()
  if (!slug) return
  const product = useAppSelector(({ product }) => product.singleProduct)
  const products = useAppSelector(({ product }) => product.products)
  const productRating = useAppSelector(({ rating }) => rating.rating)
  const loading = useAppSelector(({ product }) => product.loading)
  const ratingLoading = useAppSelector(({ rating }) => rating.loading)
  const cartLoading = useAppSelector(({ cart }) => cart.loading)
  const cartItem = useAppSelector(({ cart }) => cart.cart?.items)
  const categories = useAppSelector(({ category }) => category.catagories)
  const [productMainImageUrl, setProductMainImageUrl] = useState<string>(product?.mainImage || "")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const category = categories?.find(cat => cat._id === product?.category)
  const filtredProducts = products?.filter(product => product.slug !== slug)


  useEffect(() => {
    Promise.all([
      dispatch(getProduct(slug)),
      dispatch(getRating(slug))
    ])
  }, [dispatch, slug])

  useEffect(() => {
    if (category)
      dispatch(getProductsByCategory(category?.slug))
  }, [category])

  if (
    (!!!product) && loading === "pending" || loading === "idle"
    || ratingLoading === 'pending' || ratingLoading == 'idle'
  ) {
    return <SingleProductSkeleton />
  }
  if (!product) {
    return (
      <div className='w-full flex items-center justify-center text-center h-full'>
        <ProductNotFoundWithText />
      </div>
    )
  }



  const handleAddToCartItem = (productSlug: string) => {

    const productInCart = cartItem?.find((item) => item.product.slug === slug)
    dispatch(addItemOrUpdateItemQuantity({
      productSlug, quantity: productInCart?.quantity && productInCart?.quantity + 1 || 1
    }))
      .unwrap()
      .then((data) => {
        dispatch(getUserCart())
          .unwrap()
          .then(() => {
            toast.success(data.message)
          })
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const handleBuytItem = (productSlug: string) => {
    dispatch(addItemOrUpdateItemQuantity({ productSlug, quantity: 1 }))
      .unwrap()
      .then((data) => {
        dispatch(getUserCart())
          .unwrap()
          .then(() => {
            toast.success(data.message)
            navigate("/checkout/cart")
          })
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className=' pt-4 justify-center items-center'>
      <div className=' rounded-md p-4 m-4 
      grid grid-cols-1 lg:grid-cols-12  gap-4'>
        <div className='lg:col-span-6'>
          <div className='flex sm:flex-row flex-col-reverse justify-center gap-6'>
            {!!product.subImages.length &&
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
                alt={product.name}
                className="w-[30rem] h-[30rem] object-cover"
              />
            </div>
          </div>
        </div>
        <div className='lg:col-span-6 lg:max-h-screen lg:overflow-y-auto'>
          <div className='flex flex-col-reverse lg:flex-col mb-4 border-b border-slate-300 sm:border-none'>
            <div className='flex flex-col justify-center p-4 rounded-md sm:border border-slate-200'>
              {/* <h2 className='text-3xl text-slate-700 font-bold mb-2 '>{product.name}</h2> */}
              <h2 className='text-xl sm:text-2xl md:text-3xl text-slate-700 font-bold mb-2 break-words'>
                {product.name}
              </h2>
              <p className='text-slate-600 mb-2'>{product.description}</p>
              <p className='text-xl font-semibold mb-2 text-slate-700'>₹{product.price}</p>
              <div className='flex items-center mb-2'>
                {product?.stock && product?.stock !== 0 ? (
                  <>
                    <Badge variant={'success'}>In Stock</Badge>
                    <span className='ml-2 text-lg text-slate-600'>{product.stock}</span>
                  </>
                )
                  : <Badge variant={'destructive'}>Out Of Stock</Badge>}
              </div>
              <div className='flex items-center'>
                <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1 mr-2'>
                  <Star className='w-4 h-4 fill-white text-white' />
                  <span className='text-white font-medium'>{product.productRating.averageRating}</span>
                </div>
                <span className='text-slate-500'>({product.productRating.totalReviews} reviews)</span>
              </div>
            </div>
            <div className='flex gap-4 justify-evenly my-4 items-center sm:rounded-md  
            border-y border-slate-300 sm:border  sm:border-slate-200 p-4 sm:p-2'>
              <Button
                onClick={() => handleAddToCartItem(product.slug)}
                variant='secondary'
                className='w-72 cursor-pointer'
                disabled={cartLoading === "pending"}
              >
                Add To Cart
              </Button>
              <Button
                disabled={cartLoading === "pending"}
                onClick={() => handleBuytItem(product.slug)}
                className='w-72 cursor-pointer'>
                Buy Now
              </Button>

            </div>
          </div>
          {/* Rating Section */}
          {!!!productRating ? (
            <div className='flex w-full justify-center items-start h-full'>
              <img src={emptyRatings} alt="No orders" className="w-48 sm:w-64 md:w-72" />
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
            </div>
          )}
        </div>
      </div>
      {
        !!products?.length && <div>
          <h2 className='text-2xl font-semibold text-slate-700 mb-4 mx-4'>You may also like</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 mb-8'>
            {filtredProducts?.map((prod, idx) => (
              <Link key={idx} to={`/products/${prod.slug}`}>
                <RelatedProduct {...prod} />
              </Link>
            ))}
          </div>
        </div>

      }
    </div >
  )
}

export default Product
