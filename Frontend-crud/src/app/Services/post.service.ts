import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddResponse, PostModel, UpdatePostModel, UpdateResponse } from '../models/post-model';
import { response } from 'express';
import { map } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5228/api/Post';

  constructor(private Http:HttpClient) { }

  //fetch published posts
  // getPosts():Observable<PostModel[]>{
  //   return this.Http.get<{message:string; posts?:PostModel[]}>(`${this.apiUrl}/publishedPosts`).pipe(
  //     map(response=>response.posts?? [])
  //   )
  // }

  //fetched all posts
  getAllPosts(status:string,searchText:string=''):Observable<PostModel[]>{
    return this.Http.get<{message:string; posts?:PostModel[]}>(`${this.apiUrl}/getAllPosts`,{
      params:{
        status:status,
        searchText:searchText
      }
    }).pipe(
      map(response=>response.posts?? [])
    )

  }

  //fetch unPublished posts
  // getUnpublishedPosts():Observable<PostModel[]>{
  //   return this.Http.get<{message:string; posts?:PostModel[]}>(`${this.apiUrl}/unpublishedPosts`).pipe(
  //     map(response=>response.posts?? [])
  //   )

  // }


  //add posts
  addPost(newPost:PostModel):Observable<AddResponse>{
    return this.Http.post<AddResponse>(`${this.apiUrl}/addPost`, newPost)
  }

  //get single post by id
  getSinglePost(postId:number):Observable<PostModel>{
    const body = { id: postId }
    return this.Http.post<PostModel>(`${this.apiUrl}/getSinglePost`, body);
  }

  //update the post
  updatePost(updatedPost:UpdateResponse):Observable<AddResponse>{
    return this.Http.put<AddResponse>(`${this.apiUrl}/updatePost`, updatedPost);
  }

  //delete post (soft delete)
  deletePost(postId:number):Observable<any>{
    // console.log('service id :',postId);
    return this.Http.put(`${this.apiUrl}/deletePost`,{id:postId})
  }

  //publish unpublish post
  publishUnpublishPost(postId:number):Observable<any>{
    console.log('publish post id:',postId)
    return this.Http.put(`${this.apiUrl}/publishUnpublishPost`,{id:postId});
  }

}
