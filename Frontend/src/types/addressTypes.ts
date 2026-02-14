export interface Address {
    _id: string
    addressLine: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
    isPrimary: boolean
}
export interface AddAddressReq {
    addressLine: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
    isPrimary?: boolean
}
export interface AddAddressRes {
    data: {
        _id: string;
        addressLine: string;
        country: string;
        state: string;
        city: string;
        pincode: string;
        isPrimary: boolean,
    }
    status: number;
    message: string;
    success: boolean
}
export interface GetAddressesRes {
    data: Address[]
    status: number;
    message: string;
    success: boolean
}
export interface UpdateAddress {
    addressLine?: string;
    country?: string;
    state?: string;
    city?: string;
    pincode?: string;
    isPrimary?: boolean
}
export interface UpdateAddressReq {
    addressId: string
    data: UpdateAddress
}
export interface UpdateAddressesRes {
    data: {
        _id: string;
        addressLine: string;
        country: string;
        state: string;
        city: string;
        pincode: string;
        isPrimary: boolean,
    }
    status: number;
    message: string;
    success: boolean
}
export interface DeleteAddressesRes {
    _id: string
    status: number;
    message: string;
    success: boolean
}