export interface HeroBaner {
    _id: string
    image: string
}

export interface HeroBanerFormData {
    heroBanner: FileList
}

export interface AddHeroBannerRes {
    data: HeroBaner;
    message: string;
    status: number;
    success: boolean;
}
export interface GetHeroBannersRes {
    data: HeroBaner[];
    message: string;
    status: number;
    success: boolean;
}
export interface AddAndUpdateHeroBanner {
    heroBanner: File
}
export interface UpdateHeroBannerReq {
    bannerId: string
    data: AddAndUpdateHeroBanner
}

export interface UpdateHeroBannerRes {
    data: HeroBaner;
    message: string;
    status: number;
    success: boolean;
}
export interface DeleteHeroBannerRes {
    bannerId: string
    status: number;
    message: string;
    success: boolean
}