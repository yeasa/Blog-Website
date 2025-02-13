import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel,UpdateResponse, AddResponse, singleUserResponse, deleteUserResponse } from '../models/user-model';
import { map } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment';


// interface AddUserResponse {
//   message: string;
//   statusCode: number;
//   user: UserModel;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  private apiUrl = `${environment.apiBaseUrl}/user`
  // private apiUrl = `http://localhost:5228/api/user`;
  

  constructor(private http: HttpClient) { }

  //fetch all users
  getUsers(status:string="all",searchText:string=""):Observable<UserModel[]>{
    return this.http.get<{ message: string; statusCode: number; users?: UserModel[] }>(`${this.apiUrl}/getAllUsers`,
      {
        params:{
          status:status,
          searchtext:searchText
        }
      }
    )
    .pipe(
    map(response => response.users?? []))
  }

  //fetch active users
  // getActiveUser():Observable<UserModel[]>{
  //   return this.http.get<{ message: string; statusCode: number; users?: UserModel[] }>(`${this.apiUrl}/activeUser`)
  //   .pipe(
  //     map(response => response.users?? [])
  //   )
  // }

  //fetch inActive user
  // getInActiveUser():Observable<UserModel[]>{
  //   return this.http.get<{ message: string; statusCode: number; users?: UserModel[] }>(`${this.apiUrl}/inActiveUser`)
  //   .pipe(
  //     map(response => response.users?? [])
  //   )
  // }

  //get single user by id 
  getSingleUser(userId:number):Observable<singleUserResponse>{
    return this.http.post<singleUserResponse>(`${this.apiUrl}/getSingleUser`,{id:userId});
  }

  //add user
  addUser(newUser:UserModel):Observable<AddResponse>{
    console.log("in service data:", newUser);
    return this.http.post<AddResponse>(`${this.apiUrl}/addUser`, newUser)
  }

  // update user
  updateUser(updatedUser:UpdateResponse):Observable<AddResponse>{
    return this.http.put<AddResponse>(`${this.apiUrl}/updateUser`,updatedUser);

  }

  //deleted user 
  deleteUser(userId:number):Observable<deleteUserResponse>{
    return this.http.put<deleteUserResponse>(`${this.apiUrl}/deleteUser`,{id:userId})
  }

  //activate data
  activateUser(userId:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/activateUser`,{id:userId})
  }
  
}
