import React, { useState } from 'react'
import { Button } from '../lightswind/button'
import { Minus, Plus } from 'lucide-react'
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItemOrUpdateItemQuantity, getUserCart } from '../../features/cart/cartSlice';
import { Spinner } from '../ui/spinner';

interface CartProps {
    product: {
        _id: string;
        name: string;
        price: number;
        mainImage: string;
        stock: number;
        slug: string;
    }
    quantity: number;

}

const Cart = ({
    product,
    quantity,
    ...props
}: CartProps) => {

    const [quantityState, setQuantityState] = useState<number>(quantity)
    const loading = useAppSelector(({ cart }) => cart.loading)
    const dispatch = useAppDispatch()

    const increaseQuantity = () => {
        if (quantityState >= product.stock) {
            toast.success(`Only ${product.stock} products are remaining.`)
            return
        }
        setQuantityState(prev => prev + 1)
    }
    const decreaseQuantity = () => {
        if (quantityState <= 1) {
            setQuantityState(1)
            return
        }
        setQuantityState(prev => prev - 1)
    }

    const handleUpdateQuantity = () => {
        dispatch(addItemOrUpdateItemQuantity({ productSlug: product.slug, quantity: quantityState }))
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

    return (
        <div>
            <div className='flex flex-col gap-4 w-full sm:w-[70vw] lg:w-[40vw]
                    border border-slate-200 rounded-lg p-4'>
                <div className='flex flex-col  '>
                    <div className='flex flex-col justify-center gap-3'>
                        <div className='flex items-center m-2'>
                            <img
                                src={product.mainImage}
                                alt={product.name}
                                className='rounded-lg w-24 h-24 object-cover mr-4'
                            />
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-medium truncate '>
                                    {product.name.length > 20
                                        ? `${product.name.slice(0, 20)}...`
                                        : product.name
                                    }
                                </h2>
                                <p className='text-lg'>Price: ₹{product.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center justify-center mt-4 '>
                        <span>Qty</span>
                        <Button
                            onClick={increaseQuantity}
                            variant='github'
                            className='p-2 cursor-pointer'>
                            <Plus />
                        </Button>
                        <span className='text-center '>{quantityState}</span>
                        <Button
                            onClick={decreaseQuantity}
                            variant='github'
                            className='p-2 cursor-pointer'>
                            <Minus />
                        </Button>
                    </div>
                </div>
                <div className='flex justify-between items-center p-4 border-y border-slate-200'>
                    <p>Total Price</p>
                    <p>₹{product.price * quantityState}</p>
                </div>
                <div className='border-b border-slate-200 p-2'>
                    <Button
                        className='w-full cursor-pointer'
                        onClick={handleUpdateQuantity}
                        disabled={loading === "pending"}
                    >
                        {loading === "pending" ?
                            <Spinner data-icon="inline-start" />
                            : "Update Quantity"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Cart
