export interface Role {
    role: "USER" | "ADMIN";

}

export interface Users extends Role {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    phoneNumber: number;
}

export interface GetUsersRes {
    data: { users: Users[] }
    status: number;
    message: string;
    success: boolean
}

export interface AssignRoleReq extends Role {
    userId: string
}

export interface AssignRoleRes {
    data: {
        _id: string;
        fullName: string;
        email: string;
        avatar: string;
        phoneNumber: number;
        role: "USER" | "ADMIN";
    }
    status: number;
    message: string;
    success: boolean
}

