import React from 'react'
import { TruckElectricIcon, Package, GiftIcon, LocationEdit } from "lucide-react"

const SingleOrder: React.FC = () => {

    const data = [
        {
            "_id": "683adc2e529fba3315a452a7",
            "order": [
                {
                    "product": {
                        "_id": "67fde162f076715963568dd0",
                        "name": "1.08 m (43) T5450 Smart FHD TV",
                        "price": 24990,
                        "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746867655/vgytcp0sgjfecuq8ojdo.avif"
                    },
                    "quantity": 2
                },
                {
                    "product": {
                        "_id": "67fbe9a0c3fabf6bcd4d2474",
                        "name": "Scotlon_Geometry_All Panel_Laptop Skin-28",
                        "price": 159,
                        "mainImage": "http://res.cloudinary.com/dtbi6egyj/image/upload/v1746938110/uufcj9b2tht0cgjepgqx.webp"
                    },
                    "quantity": 2
                }
            ],
            "isPaymentDone": true,
            "paymentType": "COD",
            "status": "CANCELLED",
            "orderPrice": 50298,
            "cartTotal": 50298,
            "address": {
                "_id": "67ff26257b71423bf61e7c1c",
                "addressLine": "123 Main Street, Apt 4B",
                "country": "India",
                "state": "Gujarat",
                "city": "Rajkot",
                "pincode": "362560",
                "user": "67f8ca66dfb160acdf5940b3",
                "createdAt": "2025-04-16T03:38:13.480Z",
                "updatedAt": "2025-04-16T03:40:56.009Z",
                "__v": 0
            },
            "discountValue": 0
        }
    ]


    return (
        <div className='flex flex-col justify-center my-4'>
            <div className='grid md:grid-cols-12 gap-4 w-full'>
                <div className='md:col-span-8 p-4 flex flex-col gap-4'>
                    <h2 className='sm:text-xl font-semibold text-start'>Products Details</h2>
                    <div className='md:p-4 flex flex-col gap-4 md:w-[80%]'>
                        <h2 className='text-lg font-semibold'>
                            Order: #{data[0]._id}
                        </h2>

                        {/* Product items will go here */}
                        {data[0].order.map(({ product, quantity }) => (
                            <div key={product._id} className='flex flex-col gap-4
                    border border-slate-200 rounded-lg p-4'>
                                <div className='flex flex-col lg:flex-row'>
                                    <div className='flex justify-center gap-3'>
                                        <img src={product.mainImage} alt={product.name} className='rounded-lg w-24 h-24 object-cover mr-4' />
                                        <div className='flex flex-col m-2'>
                                            <h2 className='text-lg font-semibold inline-block sm:hidden'>
                                                {product.name.substring(0, 30)}{product.name.length > 30 ? '...' : ''}
                                            </h2>
                                            <h2 className='text-lg font-semibold hidden sm:inline-block'>{product.name}</h2>
                                            <p className='text-gray-600'>Quantity: {quantity}</p>
                                            <p className='text-lg'>Price: ${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
                <div className='md:col-span-4 p-4 border-l border-slate-200 '>
                    <h2 className='sm:text-xl font-semibold mb-4'>Payment & Order Details</h2>
                    <div className='flex flex-col gap-4 p-4'>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Payment Status:</p>
                            <span className={`font-semibold ${data[0].isPaymentDone ? 'text-green-600' : 'text-red-600'}`}>
                                {data[0].isPaymentDone ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Payment Method:</p>
                            <span className='font-semibold text-slate-700'>{data[0].paymentType}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Order Price:</p>
                            <span className='font-semibold text-slate-700'>${data[0].orderPrice}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Cart Total:</p>
                            <span className='font-semibold text-slate-700'>${data[0].cartTotal}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-slate-700 font-medium'>Discount Applied:</p>
                            <span className='font-semibold text-green-600'>${data[0].discountValue}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-4 mt-4 border border-slate-200 rounded-md w-full'>
                <div className='flex gap-4 flex-col '>
                    <div className='flex items-center gap-4'>
                        {data[0].status === "DELIVERED" && <Package width={30} hanging={30} color='green' />}
                        {data[0].status === "CANCELLED" && <Package width={30} hanging={30} color='red' />}
                        {data[0].status === "PENDING" && <TruckElectricIcon width={30} hanging={30} color='orange' />}
                        <div>
                            <h2 className='sm:text-xl font-semibold text-start'>{data[0].status}</h2>
                            <p className='text-slate-600'>The , 17 Dec</p>
                        </div>
                    </div>
                    {data[0].status === "DELIVERED" && (
                        <div className='p-2 sm:p-4 mx-4 bg-green-400 rounded-lg w-fit flex gap-2 items-center'>
                            <GiftIcon width={25} hanging={25} color='white' />
                            <p className='text-white font-medium'>
                                Yay! Your order reached on time.
                            </p>
                        </div>
                    )}

                    {data[0].status === "PENDING" && (
                        <div className='p-2 sm:p-4 mx-4 bg-yellow-400 rounded-lg w-fit flex gap-2 items-center'>
                            <TruckElectricIcon width={25} hanging={25} color='white' />
                            <p className='text-white font-medium'>
                                Your order is pending and will be processed soon.
                            </p>
                        </div>
                    )}

                    {data[0].status === "CANCELLED" && (
                        <div className='p-2 sm:p-4 mx-4 bg-red-400 rounded-lg w-fit flex gap-2 items-center'>
                            <Package width={25} hanging={25} color='white' />
                            <p className='text-white font-medium'>
                                We're sorry — this order was cancelled.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className='p-4 mt-4 border border-slate-200 rounded-md w-full'>
                <div className='flex items-center'>
                    <LocationEdit width={25} height={25} className='mx-4' color='maroon' />
                    <h2 className='sm:text-xl font-semibold text-start'>Delivered Location</h2>
                </div>
                <div className='flex items-center space-x-2 p-2'>
                    <p className="text-slate-700">{data[0].address.addressLine}</p>
                    <p className="text-slate-700">{data[0].address.city},
                        {data[0].address.state}, {data[0].address.country} - {data[0].address.pincode}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder
