import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const healthcheck = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(
            new APIResponse(200, "Ok", "Health Check Passed")
        )
})

export {healthcheck}