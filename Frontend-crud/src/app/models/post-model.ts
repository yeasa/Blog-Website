export interface PostModel {
    id:number,
    title: string,
    description:String,
    CreatedBy:Number,
    CategoryId:Number,
    isPublished:boolean
}


export interface AddResponse{
    message:string,
    success:boolean
}

export interface UpdatePostModel{
    title: string,
    description:String,
    IsPublished:boolean,
    CategoryId:Number
}
export interface UpdateResponse{
    id:number,
    UpdatedDto:UpdatePostModel
}