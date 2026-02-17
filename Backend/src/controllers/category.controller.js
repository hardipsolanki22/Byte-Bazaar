import { Category } from "../models/category.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateSlug } from "../utils/slugGenerator.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        throw new APIError(400, "Category name is required")
    }

    const isCategoryExists = await Category.findOne({ name })

    if (isCategoryExists) {
        throw new APIError(409, "Category already exists")
    }

    const slug = generateSlug(name)

    const createCategory = await Category.create({
        name,
        slug
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
    const { slug } = req.params

    if (!slug) {
        throw new APIError(400, "Category slug is required")
    }

    const category = await Category.findOne({ slug })

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
    const { slug } = req.params
    const name = req.body.name

    if (!name) {
        throw new APIError(400, "Category name is required")
    }

    if (!slug) {
        throw new APIError(400, "Category slug is required")
    }

    const isCategoryExist = await Category.findOne({ name })

    if (isCategoryExist) {
        throw new APIError(409, "Category with this name is already exist")
    }

    // generate new slug based on upaded name
    const newSlug = generateSlug(name)
    const category = await Category.findOneAndUpdate(
        { slug },
        {
            $set: {
                name,
                slug: newSlug
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
    const { slug } = req.params

    if (!slug) {
        throw new APIError(400, "Category slug is required")
    }

    const category = await Category.findOneAndDelete({ slug })

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