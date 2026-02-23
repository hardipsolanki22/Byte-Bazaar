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
export interface UserLoginRequest {
    email: string;
    password: string
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
export interface VerifyEamilResponse {
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
export interface UserUpdateRequest {
    fullName?: string;
    email?: string;
    password?: string;
    phoneNumber?: number
}
export interface UserUpdateResponse {
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
export interface UserAvatarUpdateReq {
    avatar: File
}
export interface UserAvatarUpdateRes {
    data: {
        avatar: string;
    }
    status: number;
    message: string;
    success: boolean
}
export interface ChangePasswordReq {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export interface ChangePasswordRes {
    status: number;
    message: string;
    success: boolean
}
export interface ForgotPasswordReq {
    email: string;
}
export interface ForgotPasswordRes {
    status: number;
    message: string;
    success: boolean
}
export interface UpdatePassword {
    newPassword: string;
    confirmPassword: string;
}
export interface ForgotPasswordRequest {
    forgotPasswordToken: string,
    updatePasswordData: UpdatePassword
}
export interface ForgotPassword {
    status: number;
    message: string;
    success: boolean
}