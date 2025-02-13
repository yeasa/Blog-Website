import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig,DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateResponse, } from '../../models/post-model';
import { PostService } from '../../Services/post.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-post-form',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule, InputTextModule, CheckboxModule, ButtonModule,DropdownModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
  providers:[PostService,MessageService]
})
export class PostFormComponent {


  // @Input() heading: string = 'Post Form';
  // @Output() formSubmit = new EventEmitter<any>();
  // @Output() formCancel = new EventEmitter<void>();

  heading: string = 'Post Form';
  hideFeild:boolean = false;

  // Category options with string labels and integer values
  categoryOptions = [
    { label: 'Technology', value: 1 },
    { label: 'Lifestyle', value: 2 },
    { label: 'Health', value: 3 },
    { label: 'Education', value: 4 },
    { label: 'Business', value: 5 },
    { label: 'Sports', value: 6 },
    { label: 'Health', value: 7 },
    { label: 'Education', value: 8 },
    { label: 'Business', value: 9 },
    { label: 'Sports', value: 10 }
  ];

  postForm: FormGroup;

  constructor(private messageService:MessageService,private postService:PostService,private fb: FormBuilder,public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

    this.hideFeild = config.data?.hideFeild ||false;
    this.heading = config.data?.header 

    this.postForm = this.fb.group({
      id:[null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(3000)]],
      createdBy: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      categoryId: [null, [Validators.required]],
      isPublished: [false]
    });

    if (config.data?.postData) {
      // console.log('about to patch:',config.data.postData)
      // console.log('FormGroup Controls:', Object.keys(this.postForm.controls));
      this.postForm.patchValue(config.data.postData.post);
      this.postForm.markAllAsTouched(); 
      this.postForm.updateValueAndValidity(); 
      // console.log("Form Validity After Patching:", this.postForm.valid);
    }
    

    if (this.hideFeild){
      this.postForm.removeControl('created_by');
    }

  }

  // ngOnInit():void{
  //   Object.keys(this.postForm.controls).forEach(key => {
  //     console.log(key, "Valid:", this.postForm.get(key)?.valid);
  //     console.log(key, "Errors:", this.postForm.get(key)?.errors);
  //   });
  // }
  

  submitForm() {
    if (this.postForm.valid) {
      var postId = this.config.data?.id; 
      console.log("edit check", postId)
      if(postId){ //update
        const updatedData = this.postForm.value
        const updatedPayload: UpdateResponse={
          id:postId,
          UpdatedDto: {
            title: updatedData.title,
            description: updatedData.description,
            IsPublished: updatedData.isPublished,
            CategoryId:updatedData.categoryId
          }
        }
        console.log("payload:",updatedPayload);
        this.postService.updatePost(updatedPayload).subscribe({
          next:(response)=>{
            console.log("response after update",response);
            const success = response.message==="Post Updated successfully"?true:false;
            if(success){
              this.ref.close(true)
            }else{
              this.messageService.add({severity:'warning', summary:'User notfound',detail:'no User Found with the id'})
            }
          },
          error:()=>{}
        })
      }
      else if(!postId){ //add
        console.log(this.postForm.value)
        this.postService.addPost(this.postForm.value).subscribe({
          next:(response)=>{
            if(response.success){
              this.ref.close(response.success);
            }else{
              this.messageService.add({severity:'warning', summary:'User notfound',detail:'no User Found with the id'})
            }
          }
        })
      }
      


      
    }
  }

  cancelForm() {
    this.ref.close();
  }

}
