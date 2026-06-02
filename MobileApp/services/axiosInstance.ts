
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    AxiosError, isAxiosError
} from "axios";

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
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    withCredentials: true, // Automatically send cookies with requests
    headers: {
        'Content-Type': 'application/json', // change according header type accordingly
    },

})

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken'); // get stored access token
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    })



// Add a response interceptor to handle responses
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // set custome haders if nees
        return response
    },

    async (error: AxiosError) => {
        // handle some error if user is not logged in then redirect to login page
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }
        // }
        if (error.response.status === 401) {
            try {
                const refreshToken = await AsyncStorage.getItem("refreshToken");

                if (!refreshToken) {
                    return Promise.reject(error);
                }
                const url = `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/users/refresh-access-token`;

                const response: AxiosResponse<{ data : {accessToken: string, refreshToken: string} }> = await axios.post(url, { refreshToken: refreshToken }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                await AsyncStorage.setItem("accessToken" , response.data.data.accessToken);
                await AsyncStorage.setItem("refreshToken", response.data.data.refreshToken);
                console.log("Successfully refresh token")

                error.response.config.headers["Authorization"] = "Bearer " + response.data.data.accessToken;
                return axiosInstance(error.response.config)
            }
            catch (err: any) {
                console.error("Error at refresh token", err.response.status)
                // navigate to login


                //If refresh token is invalid, you will receive this error status and log user out
                if (err.response.status === 400) {
                    throw { response: { status: 401 } };
                }
                return Promise.reject(err);
            }

        }
    })


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
            message: error instanceof Error ? error.message : "An unexpected error occurred"
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
// axiosInstance.interceptors.request.use((config) => {
//     return config;
// });

export {
    concurrentRequests, deleteReq, getReq, patchReq, postReq, putReq
};

