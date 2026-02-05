import React from 'react'
import { Button } from '../lightswind/button'
import { Label } from '../lightswind/label'
import { Input } from '../lightswind/input'
import { Textarea } from '../lightswind/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lightswind/select'

const ProductForm: React.FC = () => {
    return (
        <div className="p-4">
            <div className="text-center">
                <h2 className="text-3xl font-semibold">New Product</h2>
                <p className="mt-2 text-slate-500">Add new producy</p>
            </div>
            <div>
                <form className="flex flex-col mt-6 gap-4">
                    <div>
                        <Label htmlFor="full_name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="product name"
                            className="focus:outline-none mt-2"
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="description"
                            className="focus:outline-none mt-2"
                            rows={5}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="price"
                                className="focus:outline-none mt-2 "
                            />
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="stock">stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="Stock"
                                className="focus:outline-none mt-2"
                            />
                        </div>
                    </div>
                    <div>
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
                    <div className='mt-4'>
                        <div className='p-2 border w-fit mb-2 border-slate-200 rounded-md'>
                            <img src="/facebook-logo.png" alt=""
                                className='w-16 h-16 rounded-b-sm' />
                        </div>
                        <Label htmlFor="mainImage">main Image</Label>
                        <Input
                            id="mainImage"
                            type="file"
                            className="my-2"
                            accept="image/png, image.gpeg image/jpg image/gif"
                        />
                        <div className='mb-4'>
                            <div className='flex w-full gap-4 mb-2'>
                                <div className='p-2 border border-slate-200 rounded-md'>
                                    <img src="/facebook-logo.png" alt=""
                                        className='w-16 h-16 rounded-b-sm' />
                                </div>
                                <div className='p-2 border border-slate-200 rounded-md'>
                                    <img src="/facebook-logo.png" alt=""
                                        className='w-16 h-16 rounded-b-sm' />
                                </div>
                                <div className='p-2 border border-slate-200 rounded-md'>
                                    <img src="/facebook-logo.png" alt=""
                                        className='w-16 h-16 rounded-b-sm' />
                                </div>
                                <div className='p-2 border border-slate-200 rounded-md'>
                                    <img src="/facebook-logo.png" alt=""
                                        className='w-16 h-16 rounded-b-sm' />
                                </div>
                                <div className='p-2 border border-slate-200 rounded-md'>
                                    <img src="/facebook-logo.png" alt=""
                                        className='w-16 h-16 rounded-b-sm' />
                                </div>
                            </div>
                            <Label htmlFor="subImages">Sub Images</Label>
                            <Input
                                id="subImages"
                                type="file"
                                multiple
                                className="mt-2"
                                max={4}
                                accept="image/png, image.gpeg image/jpg image/gif"
                            />
                        </div>
                    </div>
                    <Button className="cursor-pointer">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
