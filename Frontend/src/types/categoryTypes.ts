export interface Category {
    _id: string
    name: string,
    slug: string
}
export interface CategoryFormData {
    name: string
}
export interface AddCtgReq {
    name: string
}
export interface AddCtgRes {
    data: {
        _id: string
        name: string,
        slug: string
    }
    status: number;
    message: string;
    success: boolean
}
export interface GetCtgRes {
    data: Category[]
    status: number;
    message: string;
    success: boolean
}
export interface UpdateCtg {
    name: string
}
export interface UpdateCtgReq {
    slug: string
    data: UpdateCtg
}
export interface UpdateCtgRes {
    data: {
        _id: string
        name: string,
        slug: string
    }
    status: number;
    message: string;
    success: boolean
}
export interface DeleteCtgRes {
    slug: string
    status: number;
    message: string;
    success: boolean
}