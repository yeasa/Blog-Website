import { Component, importProvidersFrom, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostModel, UpdateResponse } from '../../models/post-model';
import { PostService } from '../../Services/post.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService,MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule,TagModule, CommonModule,ButtonModule,CardModule,ConfirmDialogModule,ToastModule,MenubarModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  providers:[PostService,ConfirmationService]
})
export class PostComponent implements OnInit,AfterViewInit{

  items: MenuItem[] | undefined;

  posts: PostModel[]=[];
  status:string='published';
  allPostDistinguishTag:boolean = false;

  backgroundImageUrl:string="assets\images\postBackground.jpg";

  Heading:string='POSTS';
  addPostButtonShow:boolean=true;

  searchText:string='';

  ref: DynamicDialogRef | undefined;

  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!:ElementRef<any>;
  visibleCards: PostModel[]=[];
  itemsPerLoad = 6;
  observer!:IntersectionObserver;

  constructor(private route: ActivatedRoute,private confirmationService: ConfirmationService, private postService:PostService,public dialogService: DialogService, public messageService: MessageService){}

  ngOnInit(): void {
    // this.loadMoreCards();


    //menu items
    this.items = [
      {
          label: 'Published Posts',
          icon: 'pi pi-bolt',
          routerLink:['/posts'],
          queryParams:{status:'published'} ,
      },
      {
        label: 'UnPublished Post',
        icon: 'pi pi-calendar-minus',
        routerLink:['/posts'],
        queryParams:{status:'unpublished'}
      },
      {
          label: 'All Posts',
          icon: 'pi pi-server',
          routerLink:['/posts'],
          queryParams:{status:'all'}
      },
    ]


    this.route.queryParams.subscribe((params)=>{
      this.status = params['status'] ?? 'published';
      this.loadPosts();
    })
      
  }

  loadPosts():void{
    this.postService.getAllPosts(this.status,this.searchText).subscribe({
      next:(data)=>{
        this.posts = data;
        this.visibleCards=[];
        this.loadMoreCards();
      },
      error:(error)=>console.log('error while fetching the posts'),
      complete:()=>console.log('Posts fetched')
    })

    //published posts
    if(this.status == 'published'){
      this.Heading= 'Published Posts';
      this.addPostButtonShow=true;
      this.allPostDistinguishTag=false;
      
    }
    //all posts
    else if(this.status=='all'){
      this.Heading= 'All Posts';
      this.addPostButtonShow=false;
      this.allPostDistinguishTag =true;
      
    }
    //deleted posts
    else if(this.status == 'unpublished'){
      this.Heading= 'UnPublished Posts';
      this.addPostButtonShow=false;
      this.allPostDistinguishTag = false;
    }
  }

  ngAfterViewInit(){
    if(this.scrollAnchor){
      this.observer = new IntersectionObserver(entries=>{
        if (entries[0].isIntersecting) this.loadMoreCards();
      });
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
    
  }

  loadMoreCards(){
    // console.log("loder hit")
    const nextItems = this.posts.slice(this.visibleCards.length, this.visibleCards.length+this.itemsPerLoad);
    this.visibleCards.push(...nextItems);
  }


  searchPost(){
    if(this.searchText.trim()){
      this.postService.getAllPosts(this.status,this.searchText).subscribe({
        next:(data)=>{
          this.posts = data;
          this.visibleCards = [];
          this.loadMoreCards();
        }
      })
    }

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

  // ✅ Open Add Post Dialog
  openAddPost() {
    this.ref = this.dialogService.open(PostFormComponent, {
        header: 'Add New Post',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
            heading: 'Add New Post',
            hideFeild: false // Show Created By field
        }
    });

    this.ref.onClose.subscribe((isAdded) => {
      // console.log(postData)
        if (isAdded) {
          this.messageService.add({severity:'success', summary:'Post Added', detail:'Post Successfully Added!'})
          this.loadPosts();
        }else{
          this.messageService.add({severity:'info', summary:'Post not added', detail:'No New Post Added'})
        }
    });
  }

  // ✅ Open Edit Post Dialog
  openEditPost(postId:number) {
    this.postService.getSinglePost(postId).subscribe({
      next:(postData)=>{
        // console.log("singledata fetched:",postData);
        this.ref = this.dialogService.open(PostFormComponent, {
          header: 'Edit Post',
          width: '50%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
              heading: 'Edit Post',
              hideFeild: true,
              postData: postData,
              id:postId 
          }
        });
  
        this.ref.onClose.subscribe((updatedData) => {
          if (updatedData) { 
            this.messageService.add({ severity: 'info', summary: 'Post Updated', detail: 'Post successfully updated!' });
            this.loadPosts();
            
          }
        });
      },
      error:(error)=>{console.error('Error Fetching Post:', error);}
    })
  }

  //delete  post (soft delete)
  confirmAfterDelete(event: Event, id:number) {
    this.confirmationService.confirm({
         key:"deleteDialog",
        message: 'Do you want to delete this post?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.confirmationService.close();  
            this.deletePost(id);
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            this.confirmationService.close();  
        }
    });
  }
  deletePost(id:number){
    // console.log(id);
    this.postService.deletePost(id).subscribe({
      next:()=>{
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Post deleted successfully' });
        this.loadPosts();
      },
      error:(er)=>this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete post' })

    })

  }

  //publish unpublished post
  confirmAfterPublish(event: Event, id:number ){
    this.confirmationService.confirm({
      key:"publishDialog",
     message: 'Do you want to publish this post?',
     header: 'Publish Post Confirmation',
     icon: 'pi pi-info-circle',
     acceptButtonStyleClass:"p-button-danger p-button-text",
     rejectButtonStyleClass:"p-button-text p-button-text",
     acceptIcon:"none",
     rejectIcon:"none",

     accept: () => { 
         this.confirmationService.close(); 
         this.postService.publishUnpublishPost(id).subscribe({
          next:()=>{
            this.loadPosts()
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record published' })
          },
          error:(er)=>this.messageService.add({ severity: 'error', summary: 'Error', detail: "'Failed to publish post" })
         })
     },
     reject: () => {
         this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
         this.confirmationService.close();  
     }
 });
  }


}
