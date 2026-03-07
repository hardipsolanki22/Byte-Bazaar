import { useParams } from "react-router-dom";
import CategoryForm from "../../../components/admin/CategoryForm"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getCategories } from "../../../features/category/categorySlice";
import AppLoader from "../../../components/AppLoader";

const UpdateCategory = () => {
    // dispath that perticular category if admin refresh the page and give to form
    const { slug } = useParams();
    if (!slug) return
    const loading = useAppSelector(({ category }) => category.loading)
    const categories = useAppSelector(({ category }) => category.catagories)
    const category = categories?.find(ctg => ctg.slug === slug)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!category) {
            dispatch(getCategories())
        }
    }, [dispatch])

    return loading === "pending" && !!!categories?.length ? <AppLoader /> : (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='bg-white rounded-md lg:w-1/2 w-full sm:w-md'>
                <CategoryForm
                    {...category}
                />
            </div>
        </div>
    )
}

export default UpdateCategory
