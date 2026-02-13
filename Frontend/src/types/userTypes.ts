export interface UserData {
    // id: string;
    fullName: string;
    email: string;
    avatar: string;
    isEmailVerified: boolean;
    phoneNumber: number;
    role: "ADMIN" | "USER";
}
export interface UserRegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: number
    avatar: File
}
export interface UserLoginRequest {
    email: string;
    password: string
}
export interface UserRegisterResponse {
    data: {
        id: string;
        fullName: string;
        email: string;
        role: "USER" | "ADMIN";
        avatar: string;
        phoneNumber: number;
        isEmailVerified: boolean;
    }
    status: number;
    message: string;
    success: boolean
}
export interface UserLoginResponse {
    data: {
        accessToken: string;
        refreshToken: string;
    }
    status: number;
    message: string;
    success: boolean
}
export interface VerifyEanilResponse {
    data: {
        isEmailVerified: boolean
    }
    status: number;
    message: string;
    success: boolean
}
export interface LogoutUserResponse {
    status: number;
    message: string;
    success: boolean
}