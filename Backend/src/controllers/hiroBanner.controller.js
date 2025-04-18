import { HeroBanner } from "../models/heroBanner.model.js";
import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { destroyCloudinary, uploadCloudinary } from "../utils/cloudinary.js";
import { APIResponse } from "../utils/APIResponse.js"

const createHeroBanners = asyncHandler(async (req, res) => {
    // get file
    // check if file is present
    // find all hero banners
    // if hero banners is greater than 4 then throw error
    // if not then upload the file to cloudinary
    // create the hero banner

    const heroBannerLocalPath = req.file?.path

    if (!heroBannerLocalPath) {
        throw new APIError(400, "Hero banner image is required")
    }

    const availableHeroBanners = await HeroBanner.find({});

    if (availableHeroBanners.length >= 4) {
        throw new APIError(400, "Hero Banners limit exceeded")
    }

    const image = await uploadCloudinary(heroBannerLocalPath)

    if (!image) {
        throw new APIError(500, "Internal server error while upload hero banner")
    }

    const heroBanner = await HeroBanner.create({
        image
    })

    if (!heroBanner) {
        throw new APIError(500, "Internal server error while create hero banner")
    }

    return res
        .status(201)
        .json(
            new APIResponse(201, heroBanner, "Hero Banners Created Successfully")
        )
})

const updateHeroBanners = asyncHandler(async (req, res) => {
    const { id: heroBannerId } = req.params;
    const heroBannerLocalPath = req.file?.path

    if (!heroBannerLocalPath) {
        throw new APIError(400, "Hero banner image is required")
    }

    if (!heroBannerId) {
        throw new APIError(400, "Hero banner id is required")
    }

    const heroBanner = await HeroBanner.findById(heroBannerId)

    if (!heroBanner) {
        throw new APIError(404, "Hero Banner does not exists")
    }


    const image = await uploadCloudinary(heroBannerLocalPath)

    if (!image) {
        throw new APIError(500, "Internal server error while upload hero banner image")
    }

    destroyCloudinary(heroBanner.image)

    const updateHeroBanner = await HeroBanner.findByIdAndUpdate(heroBannerId,
        {
            $set: {
                image
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, updateHeroBanner, "Hero Banners Updated Successfully")
        )
})

const deleteHeroBanner = asyncHandler(async (req, res) => {
    const { id: heroBannerId } = req.params;

    if (!heroBannerId) {
        throw new APIError(400, "Hero banner id is required")
    }

    const availableHeroBanners = await HeroBanner.find({})

    if (availableHeroBanners.length <= 1) {
        throw new APIError(400, "Must have at least one hero banner")
    }

    const heroBanner = await HeroBanner.findByIdAndDelete(heroBannerId)

    if (!heroBanner) {
        throw new APIError(404, "Hero Banner does not exists")
    }

    await destroyCloudinary(heroBanner.image)

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Hero Banners Deleted Successfully")
        )

})

const getHeroBanners = asyncHandler(async (req, res) => {
    const heroBanners = await HeroBanner.find({})

    return res
        .status(200)
        .json(
            new APIResponse(200, heroBanners, "Hero Banners Fetched Successfully")
        )
})

export {
    createHeroBanners,
    getHeroBanners,
    updateHeroBanners,
    deleteHeroBanner
}
