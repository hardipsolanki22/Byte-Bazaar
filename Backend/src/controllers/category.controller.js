import { Category } from "../models/category.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        throw new APIError(400, "Category name is required")
    }

    const isCategoryExists = await Category.findOne({ name })

    if (isCategoryExists) {
        throw new APIError(409, "Category already exists")
    }

    const createCategory = await Category.create({
        name
    })    

    if (!createCategory) {
        throw new APIError(500, "Internal server error while create category")
    }

    return res
        .status(201)
        .json(
            new APIResponse(201, createCategory, "Category Create Successfully")
        )

})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})

    return res
        .status(200)
        .json(
            new APIResponse(200, categories, "Categories Fetched Successfully")
        )
})

const getCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params

    if (!categoryId) {
        throw new APIError(400, "Category id is required")
    }

    const category = await Category.findById(categoryId)

    if (!category) {
        throw new APIError(404, "Category does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, category, "Category Fetched Successfully")
        )
})

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params
    const name = req.body.name

    if (!name) {
        throw new APIError(400, "Category name is required")
    }

    if (!categoryId) {
        throw new APIError(400, "Category id is required")
    }

    const category = await Category.findByIdAndUpdate(categoryId,
        {
            $set: {
                name
            }
        },
        {
            new: true,
        }
    )

    if (!category) {
        throw new APIError(404, "Category does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, category, "Category Updated Successfully")
        )

})

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params

    if (!categoryId) {
        throw new APIError(400, "Category id is required")
    }

    const category = await Category.findByIdAndDelete(categoryId)

    if (!category) {
        throw new APIError(404, "Category does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, category, "Category Deleted Successfully")
        )
})


export {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}