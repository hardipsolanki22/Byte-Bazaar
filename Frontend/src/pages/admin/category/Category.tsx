import React, { useEffect } from 'react'
import { Button } from '../../../components/lightswind/button'
import { Delete, PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteCategory, getCategories } from '../../../features/admin/category/categorySlice'
import { toast } from 'sonner'

const Category = () => {
    const categories = useAppSelector(({ category }) => category.catagories)
    const loading = useAppSelector(({ category }) => category.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!categories?.length) {
            dispatch(getCategories())
        }
    }, [dispatch])

    const handleCategoryDelete = (slug: string) => {
        dispatch(deleteCategory(slug))
            .unwrap()
            .then((ctgData) => {
                toast.success(ctgData.message)
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    if ((loading === "pending" || loading === "idle") && !categories?.length) {
        return (<div>
            <h1>Loading...</h1>
        </div>
        )
    }
    return (
        <div className='flex justify-center w-full'>
            <div className='p-4 mx-2 my-4 bg-white rounded-md lg:w-1/2 w-full 
            sm:w-md h-fit flex flex-col gap-4 items-center '>
                <h2 className="text-3xl font-semibold">Categories</h2>
                <div className='w-full flex flex-col gap-4'>
                    {categories?.length && categories?.length > 0 ? (
                        categories?.map((category) => (
                            <div
                                key={category._id}
                                className='w-full flex justify-between border border-slate-400 p-4 rounded-md'>
                                <p>
                                    {category.name}
                                </p>
                                <div className='space-x-4 flex '>
                                    <Button
                                        onClick={() => navigate(`/admin/category/${category.slug}`)}
                                        variant='github' className='cursor-pointer'>
                                        <PencilIcon height={20} width={20} />Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleCategoryDelete(category.slug)}
                                        variant='destructive' className='cursor-pointer'>
                                        <Delete height={20} width={20} />Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2 className="text-3xl text-center my-4 font-semibold">Categories Not Found...!</h2>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Category
