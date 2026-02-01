import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/lightswind/select'
import { Link } from 'react-router-dom'

const Order: React.FC = () => {

  const orders = [
    {
      "_id": "683693ad1236732ae58b1d60",
      "status": "PENDING",
      "totalItems": 1,
      "products": [
        {
          "_id": "67fde162f076715963568dd0",
          "name": "1.08 m (43) T5450 Smart FHD TV",
          "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746867655/vgytcp0sgjfecuq8ojdo.avif"
        }
      ]
    },
    {
      "_id": "68369593a31a978c11f727a1",
      "status": "PENDING",
      "totalItems": 1,
      "products": [
        {
          "_id": "67fde162f076715963568dd0",
          "name": "1.08 m (43) T5450 Smart FHD TV",
          "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746867655/vgytcp0sgjfecuq8ojdo.avif"
        }
      ]
    },
    {
      "_id": "683adc2e529fba3315a452a7",
      "status": "DELIVERED",
      "totalItems": 2,
      "products": [
        {
          "_id": "67fbe9a0c3fabf6bcd4d2474",
          "name": "Scotlon_Geometry_All Panel_Laptop Skin-28",
          "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746938110/uufcj9b2tht0cgjepgqx.webp"
        },
        {
          "_id": "67fbe9a0c3fabf6bcd4d2474",
          "name": "Scotlon_Geometry_All Panel_Laptop Skin-28",
          "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746938110/uufcj9b2tht0cgjepgqx.webp"
        }
      ]
    },
    {
      "_id": "68411a5be6e847970290a462",
      "status": "PENDING",
      "totalItems": 2,
      "products": [
        {
          "_id": "67fbe9a0c3fabf6bcd4d2474",
          "name": "Scotlon_Geometry_All Panel_Laptop Skin-28",
          "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746938110/uufcj9b2tht0cgjepgqx.webp"
        },
        {
          "_id": "67fbe9a0c3fabf6bcd4d2474",
          "name": "Scotlon_Geometry_All Panel_Laptop Skin-28",
          "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746938110/uufcj9b2tht0cgjepgqx.webp"
        }
      ]
    }
  ]

  return (
    <div className='flex flex-col items-center p-4'>
      <div className='border-b border-slate-200 flex mx-2 sm:mx-4 
      justify-between items-center w-full px-2 rounded-md pb-4 mb-4'>
        <h2 className='text-2xl font-bold text-slate-700'>My Orders</h2>
        <div className='w-30 sm:w-48'>
          <Select>
            <SelectTrigger className=" mt-4">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ordered">Ordered</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='w-full p-4 flex flex-col gap-4'>
        {orders.map((order) => (
          <Link key={order._id} to={`/my-orders/${order._id}`}
            className='border border-slate-300 rounded-md p-4'>
            <div className='flex justify-between items-center'>
              <p className='font-semibold'>Status: <span className={`
                ${order.status === 'PENDING' ? 'text-yellow-600' :
                  order.status === 'SHIPPED' ? 'text-blue-600' :
                    order.status === 'DELIVERED' ? 'text-green-600' : 'text-gray-600'}
                  `}>
                {order.status}
              </span></p>
              <p className='text-slate-600'>Total Items: {order.totalItems}</p>
            </div>
            <div className='mt-2'>
              {order.products.map((product) => (
                <div key={product._id} className='flex items-center gap-4 mb-2'>
                  <img src={product.mainImage} alt={product.name}
                    className='w-24 h-24 object-cover rounded-md' />
                  <div className='relative'>
                    <span className='sm:hidden inline-block'>{product.name.substring(0, 30)}{product.name.length > 30 ? '...' : ''}</span>
                    <span className='hidden sm:inline-block'>{product.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Order
