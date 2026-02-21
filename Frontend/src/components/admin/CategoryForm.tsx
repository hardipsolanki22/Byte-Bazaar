import { Input } from '../lightswind/input'
import { Label } from '../lightswind/label'
import { Button } from '../lightswind/button'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { CategoryFormData } from '../../types/categoryTypes'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Spinner } from '../ui/spinner'
import { useNavigate } from 'react-router-dom'
import { addCategory, updateCategory } from '../../features/admin/category/categorySlice'
import { toast } from 'sonner'

type Category = {
    _id?: string
    name?: string
    slug?: string
}

const CategoryForm = ({ name, slug }: Category) => {
    const loading = useAppSelector(({ category }) => category.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormData>({
        defaultValues: {
            name
        }
    })

    const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
        if (name && slug) {
            dispatch(updateCategory({ slug, data }))
                .unwrap()
                .then((ctgData) => {
                    navigate("/admin/category")
                    toast.success(ctgData.message)
                })
                .catch((error) => {
                    toast.success(error.message)
                })
        } else {
            dispatch(addCategory(data))
                .unwrap()
                .then((ctgData) => {
                    navigate("/admin/category")
                    toast.success(ctgData.message)
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <div className="p-4 w-full">
            <div className="text-center">
                <h2 className="text-3xl font-semibold">New Category</h2>
                <p className="mt-2 text-slate-500">Add new Categoty</p>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mt-6 gap-4">
                    <div>
                        <Label htmlFor="category_name">Category Name</Label>
                        <Input
                            id="category_name"
                            type="text"
                            placeholder="Category name"
                            className="focus:outline-none mt-2"
                            {...register("name", { required: "Category name is required" })}
                        />
                        {errors.name && <span className="text-red-500 m-2">{errors.name.message}</span>}

                    </div>
                    <Button
                        type='submit'
                        className="cursor-pointer">
                        {loading === "pending" ?
                            <Spinner data-icon="inline-start" />
                            : "Submit"
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm
