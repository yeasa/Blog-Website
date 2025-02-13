import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { UserService } from '../../Services/user.service';
import { UserModel } from '../../models/user-model';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { UpdateResponse } from '../../models/user-model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, CheckboxModule, ButtonModule,SplitButtonModule,PasswordModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  providers:[UserService]
})
export class UserFormComponent {

  heading: string = 'User Form';
  hideField:boolean = false;

  userForm: FormGroup;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private userService: UserService,private messageService: MessageService) {

    this.heading = config.data?.header || 'User Form';
    this.hideField = config.data?.hideFeild ||false;

    

    this.userForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], //Validators.pattern('^[0-9-]{15}$')
      isActive: [false]
    });

    if (config.data?.userData){
      this.userForm.patchValue(config.data.userData);
      // this.userForm.markAllAsTouched(); 
      // this.userForm.updateValueAndValidity();
      console.log("validity status",this.userForm.valid)
    }

    if (this.hideField){
      this.userForm.removeControl('created_by');
    }
  }

  // ngOnInit():void{
  //   Object.keys(this.userForm.controls).forEach(key => {
  //     console.log(key, "Valid:", this.userForm.get(key)?.valid);
  //     console.log(key, "Errors:", this.userForm.get(key)?.errors);
  //   });
  // }

 


  submitForm() {
    if (this.userForm.valid) {
      var userId:number = this.config.data?.id; 
      
      if(userId){
        const formData = this.userForm.value;
        const updatedPayload: UpdateResponse={
                  id:userId,
                  UpdatedDto: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    isActive:formData.isActive
                  }
                }

        this.userService.updateUser(updatedPayload).subscribe({
          next:(response)=>{
            if(response.success){
              this.messageService.add({ severity: 'info', summary: 'User Updated', detail: 'User successfully updated!' });
              this.ref.close(response.success);
            }
          },
          error:()=>{}
        })
      }else if(!userId){
      this.userService.addUser(this.userForm.value).subscribe({
        next:(response)=>{
          if (response.success) {
            this.messageService.add({ severity: 'success', summary: 'User Added', detail: 'User has been created successfully!' });
            this.ref.close(response.success);
          } else {
            this.messageService.add({ severity: 'failure', summary: 'Could not Added', detail: 'User not been created successfully!' });
          } 
        },
        error:(error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding user' });
          console.error(error);
        },
        complete:()=>console.log('users added..')
        })
      }
    }
  }

  cancelForm() {
    this.ref.close(false);
  }

}


// this.userService.addUser(this.userForm.value).subscribe({
      //   next:(response)=>{
      //     if (response.success) {
            
      //       this.messageService.add({ severity: 'success', summary: 'User Added', detail: 'User has been created successfully!' });
      //       console.log("✅ Success:", response.message);
      //       // Show success message or update UI
      //     } else {
      //       this.messageService.add({ severity: 'failure', summary: 'Could not Added', detail: 'User not been created successfully!' });
      //       console.error("❌ Failed:", response.message);
      //       // Show error message
      //     } 
      //   },
      //   error:(error) => {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating user' });
      //     console.error(error);
      //   },
      //   complete:()=>console.log('users added..')
      // })
