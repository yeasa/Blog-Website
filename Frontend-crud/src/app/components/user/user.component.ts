import { Component,OnInit, ViewChild} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { UserService } from '../../Services/user.service';
import { UserModel,AddResponse,UpdateResponse,UpdateUserModel, singleUserResponse } from '../../models/user-model';
import { NgFor } from '@angular/common';
import { Console, error } from 'console';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { PaginatorModule } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';





@Component({
  selector: 'user-list',
  standalone: true,
  imports: [ConfirmPopupModule,TagModule, ToastModule,CommonModule,HttpClientModule,TableModule,ButtonModule,RippleModule,DialogBoxComponent,InputTextModule,PaginatorModule,MenubarModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers:[MessageService,ConfirmationService,UserService]
})
export class UserComponent implements OnInit{
  
  items: MenuItem[] | undefined;
  
  
  users: UserModel[] =[];
  status:string='active';

  searchText:string='';

  PageHeading:string='USERS';
  addUserButtonShow:boolean=true;

  //profile
  inactiveUrl:string ="assets/images/redProfilePic.jpg";
  activeUrl:string = "assets/images/blueProfilePic.png";

  ref:DynamicDialogRef | undefined;
  
  

  constructor(public dialogService: DialogService,private route: ActivatedRoute,private userService: UserService,private messageService: MessageService,private confirmationService: ConfirmationService) {}

  
  

  ngOnInit():void  { 

    //menu items
    this.items = [
      {
          label: 'Active Users',
          icon: 'pi pi-bolt',
          routerLink:['/users'],
          queryParams:{status:'active'} ,
          
      },
      {
        label: 'Inactive Users',
        icon: 'pi pi-calendar-minus',
        routerLink:['/users'],
        queryParams:{status:'inactive'}
      },
      {
          label: 'All Users',
          icon: 'pi pi-server',
          routerLink:['/users'],
          queryParams:{status:'all'}
      },
    ]

    this.route.queryParams.subscribe((params)=>{
      this.status = params['status'] ?? 'active';
      this.loadUsers();
    })
    
  }

  loadUsers(): void {
    
    this.userService.getUsers(this.status,this.searchText).subscribe({
      next:(data)=>{
        this.users = data;
        // console.log(data);
      },
      error: (error)=> console.log("error fetching user", error),
      complete:()=>console.log('users fetched..')
    });
    if(this.status == 'active'){
      this.addUserButtonShow= true;
      this.PageHeading = 'Active Users'
      // this.userService.getActiveUser().subscribe({
      //   next:(data)=>{
      //     this.users = data;
      //     // console.log(data);
      //   },
      //   error: (error)=> console.log("error fetching user", error),
      //   complete:()=>console.log('users fetched..')
      // });
    }
    else if (this.status == 'inactive'){
      this.addUserButtonShow = false;
      this.PageHeading = 'Inactive Users';
      // this.userService.getInActiveUser().subscribe({
      //   next:(data)=>{
      //     this.users = data;
      //     // console.log(data);
      //   },
      //   error: (error)=> console.log("error fetching user", error),
      //   complete:()=>console.log('users fetched..')
      // });
    }
    else if(this.status == 'all'){
      this.addUserButtonShow = false;
      this.PageHeading='All Users'
      // this.userService.getUsers(this.status).subscribe({
      //   next:(data)=>{
      //     this.users = data;
      //     // console.log(data);
      //   },
      //   error: (error)=> console.log("error fetching user", error),
      //   complete:()=>console.log('users fetched..')
      // });
    }

    
  }

  searchUser(){
    this.userService.getUsers(this.status,this.searchText.trim()).subscribe({
      next:(data)=>{
        this.users =data;
        this.loadUsers();
      }
    })

  }

  //status display
  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'warning';
    }
  }



  openAddUser(){
      this.ref = this.dialogService.open(UserFormComponent, {
              header: 'Add New Post',
              width: '50%',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: true,
              data: {
                  heading: 'Add New User',
                  hideFeild: false 
              }
      });
      this.ref.onClose.subscribe((data) => {
        if(data){
          this.messageService.add({ severity: 'success', summary: 'User Updated', detail: 'Error updating user' });
        }
        // this.messageService.add({ severity: 'success', summary: 'User Updated', detail: 'Error updating user' });
        this.loadUsers();
      });

      // this.ref.onClose.subscribe((userData:UserModel) => {
      //   this.loadUsers();
      //         if (userData) {
      //           this.userService.addUser(userData).subscribe({
      //             next:(response)=>{
      //               if (response.success) {
      //                 this.messageService.add({ severity: 'success', summary: 'User Added', detail: 'User has been created successfully!' });
      //                 console.log("✅ Success:", response.message);
      //                 // Show success message or update UI
      //               } else {
      //                 this.messageService.add({ severity: 'failure', summary: 'Could not edit', detail: 'User not been created successfully!' });
      //                 console.error("❌ Failed:", response.message);
      //                 // Show error message
      //               } 
      //             },
      //             error:(error) => {
      //               this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating user' });
      //               console.error(error);
      //             },
      //             complete:()=>console.log('users edited..')
      //           }) 
      //       }
              
      //     });
      
  }

  openEditPost(userId:number) {
    // console.log(userId);
    this.userService.getSingleUser(userId).subscribe({
      next:(singleUser)=>{
        // console.log(singleUser);
        this.ref = this.dialogService.open(UserFormComponent, {
          header: 'Edit User',
          width: '50%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
              heading: 'Edit User',
              hideFeild: true,
              userData:singleUser.user,
              id: userId
          }
        });
        this.ref.onClose.subscribe((data) => {
          if(data){
            this.loadUsers();
            this.messageService.add({ severity: 'success', summary: 'User Edited', detail: 'User has been edited successfully!' });
          }else{
            this.messageService.add({ severity: 'info', summary: 'User not Edited', detail: 'User has not been edited!' });

          }
          
    
        });

      },
    })
    
    
}


  
  //delete button
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

    accept() {
        this.confirmPopup.accept();
    }
    reject() {
      this.confirmPopup.reject();
    }

  confirm(event: Event, id:number) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Want to delete the User?',
          accept: () => {
            this.userService.deleteUser(id).subscribe({
              next:()=>{
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                console.log("delete confirmed")
                this.confirmationService.close(); 
                this.loadUsers();
              }
            })
               
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
              this.confirmationService.close();  
          }
      });
  }


  //edit inactivate->active
  activateUser(event:Event,id:number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Want to delete the User?',
      accept:()=>{
        this.userService.activateUser(id).subscribe({
          next:()=>{
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            // console.log("activate confirmed")
            this.confirmationService.close(); 
            this.loadUsers();
          }
        })

      },
      reject:()=>{
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        this.confirmationService.close();  
      }
  })
  }

}