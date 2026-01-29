import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/lightswind/select"
import { Star } from "lucide-react"
import { Link } from 'react-router-dom'

const Products: React.FC = () => {

  // create products data array with name, prie, main image, category, average rating, rating count
  const products = [
    {
      name: 'iPhone 13',
      price: 999,
      mainImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
      averageRating: 4.5,
      ratingCount: 120,
      slug: 'iphone-13'
    },
    {
      name: 'Samsung Galaxy S21',
      price: 899,
      mainImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
      averageRating: 4.3,
      ratingCount: 95,
      slug: 'samsung-galaxy-s21'
    },
    {
      name: 'Apple Watch Series 7',
      price: 399,
      mainImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
      averageRating: 4.7,
      ratingCount: 80,
      slug: 'apple-watch-series-7'
    },
    {
      name: 'Sony Alpha a7 III',
      price: 299,
      mainImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVsZXZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
      averageRating: 4.3,
      ratingCount: 45,
      slug: 'sony-alpha-a7-iii'
    }
  ]

  return (
    <section className=''>
      {/* <h1 className='text-3xl sm:text-4xl lg:text-5xl'>Products </h1> */}
      <div className='grid m-2 gap-4 grid-cols-span-1 lg:grid-cols-12'>
        <div className='lg:col-span-3 bg-white p-4 border border-slate-400 rounded-md'>
          <div className='border-b border-slate-400 pb-3 text-left'>
            <h3 className='text-xl'>Filters</h3>
            <p className='text-slate-400'>1000+ Products</p>
          </div>
          <div className='border-b border-slate-400 py-3 text-left'>
            <h2 className='text-xl'>Category</h2>
            <Select>
              <SelectTrigger className="w-full mt-4">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Smart Mobile">Smart Mobiles</SelectItem>
                <SelectItem value="Smart Watches">Smart Watches</SelectItem>
                <SelectItem value="Cameras">Cameras</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='lg:col-span-9 bg-white p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {products?.map((product, index) => (
              <Link key={index} to={`/products/${product.slug}`}>
                <div className='border border-slate-400 rounded-md p-4'>
                  <img src={product.mainImage} alt={product.name}
                    className='w-full h-48 object-cover mb-4 rounded-md' />
                  <h3 className='text-lg font-semibold text-slate-600'>{product.name}</h3>
                  <p className='text-slate-800 font-bold mt-2'>${product.price}</p>
                  <div className='flex items-center mt-2'>
                    <div className='bg-blue-600 px-2 py-1 rounded-lg flex items-center gap-1 mr-1'>
                      <span className='text-white'>
                        {product.averageRating}
                      </span>
                      <Star size={16} color='white'/>
                    </div>
                    <span className='text-slate-600'>{product.ratingCount} reviews</span>
                  </div>
                </div>

              </Link>
            ))}



          </div>

        </div>
      </div>
    </section>
  )
}

export default Products
