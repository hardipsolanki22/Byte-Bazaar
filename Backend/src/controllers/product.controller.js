import { Product } from "../models/product.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js"

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    if ([name, description, price, stock, category].some(field => field?.trim() === "" || field === undefined)) {
        throw new APIError(400, "All fileds are required")
    }

    const categoryTobeAdd = await Category.findById(category)

    if (!categoryTobeAdd) {
        throw new APIError(404, "Category does not exists")
    }

    const mianImageLocalPath = req.file?.path

    if (!mianImageLocalPath) {
        throw new APIError(400, "Product main image is required")
    }

    const mainImage = await uploadCloudinary(mianImageLocalPath)

    if (!mainImage) {
        throw new APIError(500, "Internal server erorr while upload main image")
    }
    // todos:: handle multiple images 

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        mainImage,
        subImage,// handle
        owner: req.user._id
    })

})



export {
    createProduct
}