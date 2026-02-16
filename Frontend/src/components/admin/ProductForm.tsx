import React, { useEffect, useState } from 'react'
import { Button } from '../lightswind/button'
import { Label } from '../lightswind/label'
import { Input } from '../lightswind/input'
import { Textarea } from '../lightswind/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lightswind/select'
import { MAX_IMAGES } from '../../config/constants'
import type { ProductFormData } from '../../types/productTypes'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCategories } from '../../features/admin/category/categorySlice'

const ProductForm: React.FC = () => {
    const [subImages, setSubImages] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState<string>("");
    const categories = useAppSelector(({ category }) => category.catagories)
    const loading = useAppSelector(({ category }) => category.loading)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ProductFormData>()

    const handleSubImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        const selectedFiles = Array.from(files).slice(0, MAX_IMAGES);;
        const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file))
        setSubImages(prev => [...prev, ...imageUrls].slice(0, MAX_IMAGES))
    }

    const removeSelectedImage = (imageIdx: number) => {
        setSubImages(prevImages => prevImages.filter((_, idx) => {
            const removedUrl = prevImages[imageIdx];
            URL.revokeObjectURL(removedUrl); // Cleanup! 
            return idx !== imageIdx
        }))
    }

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        if (mainImage.length) {
            URL.revokeObjectURL(mainImage); // cleanup main image in browser
        }
        setMainImage(URL.createObjectURL(e.target.files[0]));
    }



    const onSubmit: SubmitHandler<ProductFormData> = (data) => {
        console.log(data)
    }
    useEffect(() => {
        if (!categories?.length) {
            dispatch(getCategories())
        }
    }, [dispatch])

    return loading === 'pending' ? (
        <div>
            <h1>Loading...</h1>
        </div>
    ) : (
        <div className="p-4">
            <div className="text-center">
                <h2 className="text-3xl font-semibold">New Product</h2>
                <p className="mt-2 text-slate-500">Add new producy</p>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mt-6 gap-4">
                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="product name"
                            className="focus:outline-none mt-2"
                            {...register("name", { required: "Product name is required" })}

                        />
                        {errors.name && <span className="text-red-500 m-2">{errors.name.message}</span>}

                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="description"
                            className="focus:outline-none mt-2"
                            rows={5}
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <span className="text-red-500 m-2">{errors.description.message}</span>}

                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="price"
                                className="focus:outline-none mt-2 "
                                {...register("price", { required: "Price is required" })}

                            />
                            {errors.price && <span className="text-red-500 m-2">{errors.price.message}</span>}

                        </div>
                        <div className='w-full'>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="Stock"
                                className="focus:outline-none mt-2"
                                {...register("stock", { required: "Stock is required" })}
                            />
                            {errors.stock && <span className="text-red-500 m-2">{errors.stock.message}</span>}
                        </div>
                    </div>
                    <div>
                        <Controller
                            name="category"
                            control={control}
                            rules={{
                                required: "Category is required"
                            }}
                            render={(({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full mt-4">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem
                                                key={category._id}
                                                value={category.slug}>
                                                {category.name}
                                            </SelectItem>

                                        ))}
                                    </SelectContent>
                                </Select>
                            ))}
                        />

                        {errors.category && <span className="text-red-500 m-2">{errors.category.message}</span>}

                    </div>
                    <div className='mt-4'>
                        {mainImage &&
                            <div className='p-2 border w-fit mb-2 border-slate-200 rounded-md'>
                                <img src={mainImage} alt="mainImage"
                                    className='w-16 h-16 rounded-b-sm' />
                            </div>
                        }
                        <Label htmlFor="mainImage">main Image</Label>
                        <Input
                            id="mainImage"
                            type="file"
                            className="my-2"
                            accept="image/png, image.gpeg image/jpg image/gif"
                            {...register("mainImage", {
                                required: "Main image is required"
                            })}
                            onChange={(e) => {
                                register("mainImage").onChange(e)
                                handleMainImageChange(e)
                            }}
                        />
                        {errors.mainImage && <span className="text-red-500 m-2">{errors.mainImage.message}</span>}

                        <div className='mb-4'>
                            <div className='flex w-full gap-4 mb-2'>
                                {subImages.map((image, idx) => (
                                    <div key={idx}
                                        className='p-2 border border-slate-200 rounded-md relative'>
                                        <img src={image} alt={`Product-${idx + 1}`}
                                            className='w-16 h-16 rounded-b-sm' />
                                        <Button
                                            type='button'
                                            variant='github'
                                            onClick={() => removeSelectedImage(idx)}
                                            className='absolute -top-2 -right-2 cursor-pointer rounded-full w-6 h-6'
                                        >
                                            ×
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Label htmlFor="subImages">Sub Images (Max: {MAX_IMAGES})</Label>
                            <Input
                                id="subImages"
                                type="file"
                                multiple
                                className="mt-2"
                                accept="image/png, image.gpeg image/jpg image/gif"
                                {...register("subImages", {
                                    required: "Sub images are required"
                                })}
                                onChange={(e) => {
                                    handleSubImagesChange(e)
                                    register("subImages").onChange(e)
                                }}
                            />
                            {errors.subImages && <span className="text-red-500 m-2">{errors.subImages.message}</span>}

                        </div>
                    </div>
                    <Button
                        type='submit'
                        className="cursor-pointer">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
