import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/lightswind/button'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearUserSingleOrder, getUserOrders } from '../features/order/orderSlice'
import emptyOrders from "../assets/svg/empty-orders.svg"
import { MyOrdersSkeleton } from '../components/skeleton/userOrdersSkeleton'


const Order: React.FC = () => {

  const loading = useAppSelector(({ order }) => order.loading)
  const orders = useAppSelector(({ order }) => order.userOrders)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (!orders?.length)
      dispatch(getUserOrders())

    dispatch(clearUserSingleOrder())
  }, [dispatch])

  if ((loading === "idle" || loading === 'pending') && !orders?.length) {
    return <MyOrdersSkeleton />
  }

  if (!orders?.length) {
    return (
      <div className='w-full flex items-center justify-center text-center min-h-screen px-4'>
        <img src={emptyOrders} alt="No orders" className="w-48 sm:w-64 md:w-72" />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center p-4'>
      <div className='border-b border-slate-200 flex mx-2 sm:mx-4 
      justify-between items-center w-full px-2 rounded-md pb-4 mb-4'>
        <h2 className='text-2xl font-bold text-slate-700'>My Orders</h2>

      </div>
      <div className='w-full p-4 flex flex-col gap-4'>
        {orders.map((order) => (
          <div className='border border-slate-300 rounded-md p-4'>
            <div key={order._id}
              onClick={() => navigate(`/my-orders/${order._id}`)}
              className='cursor-pointer'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold mb-3'>Status: <span className={`
                ${order.status === 'PENDING' ? 'text-yellow-600' :
                    order.status === 'CANCELLED' ? 'text-red-600' :
                      order.status === 'DELIVERED' ? 'text-green-600' : 'text-gray-600'}
                  `}>
                  {order.status}
                </span></p>
                <p className='text-slate-600'>Total Items: {order.totalItems}</p>
              </div>
              <div className='mt-2'>
                {order.products.map((product) => (
                  <div key={product._id} className='flex gap-4 mb-4 '>
                    <img src={product.mainImage} alt={product.name}
                      className='w-24 h-24 object-cover rounded-md' />
                    <div className='mt-3'>
                      <span className='sm:hidden inline-block'>
                        {product.name.length > 20
                          ? `${product.name.slice(0, 20)}...`
                          : product.name
                        }
                      </span>
                      {/* <span className='sm:hidden inline-block'>{product.name.substring(0, 30)}{product.name.length > 30 ? '...' : ''}</span> */}
                      <span className='hidden sm:inline-block'>{product.name}</span>
                    </div>
                    {order.status === "DELIVERED" &&
                      <div className='flex items-end w-full justify-end'>
                        <Button className='cursor-pointer'
                          onClick={(e) => {
                            e.stopPropagation();   // stops event bubbling
                            navigate(`/rating/${product.slug}`);
                          }}>
                          Add Feedback
                        </Button>
                      </div>
                    }
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Order
