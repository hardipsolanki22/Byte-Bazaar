import { Product } from "../models/product.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { destroyCloudinary, uploadCloudinary } from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js"
import { Rating } from "../models/rating.modle.js"
import { aggregatePaginateOption } from "../utils/helpers.js";
import mongoose from "mongoose";

const uploadSubImages = async (subImagesPath) => {
    try {
        // check if subImagesPath is empty or not
        if (subImagesPath.length < 1) {
            return []
        }

        // Promise.all is used to upload all sub images at once
        const subImages = await Promise.all(
            subImagesPath?.map(async (imagePath) => {
                const subImage = await uploadCloudinary(imagePath)
                if (!subImage) {
                    throw new APIError(500, "Internal server erorr while upload sub images")
                }
                return subImage
            })
        )
        return subImages
    } catch (error) {
        throw new APIError(500, error.message || "Internal server error while uploading sub images")
    }
}

const destroySubImages = async (subImages) => {
    try {
        // check if subImages is empty or not
        if (subImages.length < 1) {
            return
        }

        // Promise.all is used to destroy all sub images at once
        await Promise.all(
            subImages?.map(async (imageUrl) => {
                await destroyCloudinary(imageUrl)
            })
        )
    } catch (error) {
        throw new APIError(500, error.message || "Internal server error while destroying sub images")
    }
}

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    if ([name, description, price, stock, category].some(field => field?.trim() === "" || field === undefined)) {
        throw new APIError(400, "All fileds are required")
    }

    const categoryTobeAdd = await Category.findById(category)

    if (!categoryTobeAdd) {
        throw new APIError(404, "Category does not exists")
    }

    // handle mainImage upload
    let mainImageLocalPath;

    if (req.files && req.files?.mainImage && req.files?.mainImage.length > 0) {
        mainImageLocalPath = req.files.mainImage[0].path
    }

    if (!mainImageLocalPath) {
        throw new APIError(400, "Product main image is required")
    }

    const mainImage = await uploadCloudinary(mainImageLocalPath)

    if (!mainImage) {
        throw new APIError(500, "Internal server erorr while upload main image")
    }

    // handle subImages upload if exists
    let subImagesLocalPath = [];

    if (req.files && req.files?.subImages && req.files?.subImages.length > 0) {
        subImagesLocalPath = req.files.subImages.map(file => file.path)
    }

    // upload subImages if exists
    const subImages = await uploadSubImages(subImagesLocalPath)

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        mainImage,
        subImages,
        owner: req.user._id,
        category: categoryTobeAdd._id
    })

    if (!product) {
        throw new APIError(500, "Internal server error while creating product")
    }

    return res
        .status(201)
        .json(
            new APIResponse(201, product, "Product Created Successfully")
        )

})

const getAllProducts = asyncHandler(async (req, res) => {
    const { limit = 8, page = 1 } = req.query;


    // aggregation pipeline to get all products with average rating
    const aggregation = Product.aggregate([
        {
            $match: {}
        },
        {
        // lookup to get all ratings of product
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "product",
                as: "productRating",
                // pipeline: [
                //     {
                //         $group: {
                //             _id: null,
                //             averageRating: {
                //                 $avg: "$rating"
                //             }
                //         }
                //     }
                // ]
            }
        },
        {
            // get average rating of product
            $addFields: {
                averageRating: {
                    $avg: "$productRating.rating"
                }
            }
        },
        {
            // project to get only required fields
            $project: {
                name: 1,
                price: 1,
                mainImage: 1,
                averageRating: 1,
            }
        }
    ])

    // using aggregatePaginate to paginate the products
    // aggregatePaginateOption is a helper function to get the options for aggregatePaginate
    const products = await Product.aggregatePaginate(aggregation,
        aggregatePaginateOption({
            page,
            limit,
            customLabels: {
                totalDocs: "totalProducts",
                docs: "products"
            }
        })
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, products, "All Product Fatched Successfully")
        )
})

const getProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        throw new APIError(400, "Product id is required")
    }

    // aggregation pipeline to get product with average rating and user details
    const product = await Product.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            // lookup to get all ratings of product
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "product",
                as: "productRating",
                pipeline: [
                    {
                        $project: {
                            product: 0
                        }
                    },
                    {
                        // lookup to get user details
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user",
                            pipeline: [
                                {
                                    // project to get only required fields
                                    $project: {
                                        fullName: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            // get first user details from user array
                            user: { $arrayElemAt: ["$user", 0] }
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                // get average rating of product
                averageRating: {
                    $avg: "$productRating.rating"
                }
            }
        },
        {
            // project to get only required fields
            $project: {
                name: 1,
                description: 1,
                price: 1,
                stock: 1,
                mainImage: 1,
                subImages: 1,
                averageRating: 1,
                productRating: 1
            }
        }
    ])


    if (!product.length) {
        throw new APIError(404, "Product does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, product, "Product Fatched Successfully")
        )

})

const getProductsByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const { limit = 8, page = 1 } = req.query;

    if (!categoryId) {
        throw new APIError(400, "Category id is required")
    }

    const isCategotyExists = await Category.findById(categoryId)

    if (!isCategotyExists) {
        throw new APIError(404, "Category does not exists")
    }

    // aggregation pipeline to get products by category with average rating
    const aggregation = Product.aggregate([
        {
            $match: {
                category: new mongoose.Types.ObjectId(categoryId)
            }
        },
        {
            /// lookup to get all ratings of product
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "product",
                as: "productRating"
            }
        },
        {
            $addFields: {
                // get average rating of product
                averageRating: {
                    $avg: "$productRating.rating"
                }
            }
        },
        {
            // project to get only required fields
            $project: {
                name: 1,
                price: 1,
                mainImage: 1,
                averageRating: 1,
            }
        }
    ])

    // using aggregatePaginate to paginate the products
    const products = await Product.aggregatePaginate(aggregation, aggregatePaginateOption({
        page,
        limit,
        customLabels: {
            totalDocs: "totalProducts",
            docs: "products"
        }
    }))

    // check if products exists or not
    if (!products.products.length) {
        throw new APIError(404, "No products found in this category")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, products, "Category Products Fatched Successfully")
        )

})

const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, stock, category } = req.body;

    if (!productId) {
        throw new APIError(400, "Product id is required")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new APIError(404, "Product does not exists")
    }

    // handle main image upload
    let mainImageLocalPath;

    if (req.files && req.files?.mainImage && req.files?.mainImage?.length > 0) {
        mainImageLocalPath = req.files.mainImage[0].path
    }

    const mainImage = mainImageLocalPath && await uploadCloudinary(mainImageLocalPath)

    if (mainImageLocalPath !== undefined && !mainImage) {
        throw new APIError(500, "Internal server error while upload main image")
    }

    // destroy previous mainImage if exists
    mainImage && await destroyCloudinary(product.mainImage)

    // handle subImages upload if exists
    let subImagesLocalPath = [];

    if (req.files && req.files?.subImages && req.files?.subImages.length > 0) {
        subImagesLocalPath = req.files.subImages.map(file => file.path)
    }

    const productSubImages = product.subImages

    // upload subImages 
    const subImages = await uploadSubImages(subImagesLocalPath)

    // detroy previous subImages 
    await destroySubImages(productSubImages)

    const updateProduct = await Product.findByIdAndUpdate(productId,
        {
            $set: {
                category,
                name,
                description,
                stock,
                price,
                ...(mainImage && { mainImage }), // if mainImage is not undefined then update mainImage
                ...(subImages.length > 0 && { subImages }) // if subImages is not empty then update subImages

            }
        },
        {
            new: true,
        }
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, updateProduct, "Product Updated Successfully")
        )
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        throw new APIError(400, "Product id is required")
    }

    // delete product from database
    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
        throw new APIError(404, "Product does not exist")
    }

    // delete product all rating
    await Rating.deleteMany({ product: productId })

    // delete product mainImages
    await destroyCloudinary(product.mainImage)

    // delete product subImages
    await destroySubImages(product.subImages)

    return res
        .status(200)
        .json(
            new APIResponse(200, product, "Product Deleted Successfully")
        )

})

const searchProduct = asyncHandler(async (req, res) => {
    const { limit = 8, page = 1, search } = req.query

    if (!search) {
        throw new APIError(400, "Search query is required")
    }

    // aggregation pipeline to get products by search with average rating
    const aggregation = Product.aggregate([
        {
            $match: {
                $or: [
                    // get all products which name or description contains search query
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            }
        },
        {
            // lookup to get all ratings of product
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "product",
                as: "productRating"
            }
        },
        {
            $addFields: {
                // get average rating of product
                averageRating: {
                    $avg: "$productRating.rating"
                }
            }
        },
        {
            // project to get only required fields
            $project: {
                name: 1,
                price: 1,
                mainImage: 1,
                averageRating: 1
            }
        }
    ])

    // using aggregatePaginate to paginate the products
    const products = await Product.aggregatePaginate(aggregation, aggregatePaginateOption({
        page,
        limit,
        customLabels: {
            totalDocs: "totalProducts",
            docs: "products"
        }
    }))

    // check if products exists or not
    if (!products.products.length) {
        throw new APIError(404, "Product does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, products, "Product Fatched Successfully")
        )
})




export {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    getProductsByCategory,
    searchProduct
}