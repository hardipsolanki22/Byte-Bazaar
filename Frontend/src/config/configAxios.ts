import axios, { isAxiosError } from "axios";
import {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    AxiosError,
} from "axios"
import { CONFIG } from "./constants";

// Define types for Axios responses
export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

// Define types for Axios errors
export interface ApiError {
    message: string;
    status?: number;
    data?: any;
}



// Create an Axios instance with base configurations
const axiosInstance: AxiosInstance = axios.create({
    baseURL: CONFIG.BACKEND_URL,
    withCredentials: true, // Automatically send cookies with requests
    headers: {
        "Content-Type": "application/json"
    }

})

// Add a response interceptor to handle responses
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // set custome haders if nees
        return response
    },

    (error: AxiosError) => {
        // handle some error if user is not logged in then redirect to login page
        if (error.status === 401) {
            // window.location.href = '/';
        }
        return Promise.reject(error);

    }
)

// Handle error for batter error response
const errorHandlerRes = (error: unknown): ApiError => {
    if (isAxiosError(error)) {
        return {
            message: error.message,
            status: error.status,
            data: error.response?.data
        }
    } else {
        return {
            message: "An unexpected error occurred"
        }
    }
}

// Helper function for GET request
const getReq = async<ResponseT>(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<ResponseT>> => {
    try {
        const response: AxiosResponse<ResponseT> = await axiosInstance.get<ResponseT>(url, config)
        return {
            // inside data we also have statusCode, message, data etc...Backed json data
            data: response.data,
            status: response.status,
            statusText: response.statusText
        }

    } catch (error) {
        throw errorHandlerRes(error)
    }
}
// Helper function for POST request
const postReq = async<RequestT, ResponseT>(
    url: string,
    data?: RequestT,
    config?: AxiosRequestConfig
): Promise<ApiResponse<ResponseT>> => {
    try {
        const response: AxiosResponse<ResponseT> = await axiosInstance.post<ResponseT>(
            url,
            data,
            config,
        )
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        }
    } catch (error) {
        throw errorHandlerRes(error)
    }
}
// Helper function for PATCH request
const patchReq = async<RequestT, ResponseT>(
    url: string,
    data?: RequestT,
    config?: AxiosRequestConfig
): Promise<ApiResponse<ResponseT>> => {
    try {
        const response: AxiosResponse<ResponseT> = await axiosInstance.patch<ResponseT>(
            url,
            data,
            config
        )
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        }
    } catch (error) {
        throw errorHandlerRes(error)
    }
}

// Helper function for PUT request
const putReq = async<RequestT, ResponseT>(
    url: string,
    data: RequestT,
    config?: AxiosRequestConfig
): Promise<ApiResponse<ResponseT>> => {
    try {
        const response: AxiosResponse<ResponseT> = await axiosInstance.put<ResponseT>(
            url,
            data,
            config
        )
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        }
    } catch (error) {
        throw errorHandlerRes(error)
    }
}

// Helper function for DELETE request
const deleteReq = async<ResponseT>(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<ResponseT>> => {
    try {
        const response: AxiosResponse<ResponseT> = await axiosInstance.delete<ResponseT>(
            url,
            config
        )
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        }
    } catch (error) {
        throw errorHandlerRes(error)
    }
}

// Function to handle concurrent requests
const concurrentRequests = async<ResponseT1, ResponseT2>(
    url: string,
    urlSecond: string,
): Promise<[ApiResponse<ResponseT1>, ApiResponse<ResponseT2>]> => {
    try {
        const [responseFirst, responseSecond] = await axios.all([
            axiosInstance.get(url),
            axiosInstance.get(urlSecond)
        ])

        return [
            {
                data: responseFirst.data,
                status: responseFirst.status,
                statusText: responseFirst.statusText
            },
            {
                data: responseSecond.data,
                status: responseFirst.status,
                statusText: responseFirst.statusText
            },

        ]


    } catch (error) {
        throw errorHandlerRes(error)
    }

}

// Interceptor to handle offline mode
axiosInstance.interceptors.request.use((config) => {
    if (!navigator.onLine) {
        return Promise.reject(new Error("No internet connection"));
    }
    return config;
});

export {
    getReq,
    postReq,
    patchReq,
    putReq,
    deleteReq,
    concurrentRequests
}