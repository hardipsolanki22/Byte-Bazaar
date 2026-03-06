interface User {
    _id: string;
    avatar: string;
    fullName: string
}
interface RatingUser {
    _id: string,
    comment?: string;
    user: User;
    rating: Number,
    createdAt: Date
}
export interface Rating {
    users: RatingUser[]
    excellent: number;
    good: number;
    average: number;
    poor: number;
    terrible: number;
}
export interface GetRatingRes {
    data: {
        ratings: Rating[]
        // other fields likes totalRating, page, limit, hasNextPage if need for pagination logic
    }
    status: number;
    message: string;
    success: boolean
}
export interface CreateRating {
    comment: string;
    rating: number;
}
export interface CreateRatingReq {
    comment: string;
    rating: number;
    slug: string;
}

export interface CreateRatingRes {
    status: number;
    message: string;
    success: boolean
    daat: {}
}