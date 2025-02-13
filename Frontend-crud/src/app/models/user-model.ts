

export interface UserModel {
    Id:number,
    Name:string,
    Email:string,
    Password:string,
    Phone:string,
    IsActive:boolean
}

export interface AddResponse{
    message:string,
    success:boolean
}


export interface UpdateUserModel{
    name: string,
    email:string,
    phone:number,
    isActive:boolean
}
export interface UpdateResponse{
    id:number,
    UpdatedDto:UpdateUserModel
}

export interface singleUserResponse{
    message:string;
    user:UserModel
}

export interface deleteUserResponse{
    message:string;
    status:boolean
}


