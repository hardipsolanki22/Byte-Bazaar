import { Address } from "../models/address.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// set primary or default address later
const createAddress = asyncHandler(async (req, res) => {
    const { addressLine, country, state, city, pincode } = req.body;

    const address = await Address.create({
        addressLine,
        country,
        state,
        city,
        pincode,
        user: req.user._id
    })

    if (!address) {
        throw new APIError(500, "Internal server error while create address")
    }

    return res
        .status(201)
        .json(
            new APIResponse(201, address, "Address Created Successfully")
        )

})

const getAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    if (!addressId) {
        throw new APIError(400, "Address id is required")
    }

    const address = await Address.findById(addressId)

    if (!address) {
        throw new APIError(404, "Address does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, address, "Address Fetched Successfully")
        )

})

const getUserAddresses = asyncHandler(async (req, res) => {

    const addresses = await Address.find({ user: req.user._id })

    return res
        .status(200)
        .json(
            new APIResponse(200, addresses, "User Addresses Fetched Successfully")
        )
})

const updateAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const { addressLine, country, state, city, pincode } = req.body;

    if (!addressId) {
        throw new APIError(400, "Address id is required")
    }

    const address = await Address.findByIdAndUpdate(addressId,
        {
            $set: {
                addressLine,
                country,
                state,
                city,
                pincode
            }
        },
        {
            new: true
        }

    )


    if (!address) {
        throw new APIError(404, "Address does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, address, "Address Updated Successfully")
        )

})

const deleteAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    if (!addressId) {
        throw new APIError(400, "Address id is required")
    }

    const address = await Address.findByIdAndDelete(addressId)

    if (!address) {
        throw new APIError(404, "Address does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Address Deleted Successfully")
        )

})

export {
    createAddress,
    getAddress,
    getUserAddresses,
    updateAddress,
    deleteAddress
}