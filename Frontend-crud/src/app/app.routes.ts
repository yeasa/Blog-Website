import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';

export const routes: Routes = [
    {path:'users', component:UserComponent},

    {path:'posts', component:PostComponent},
    {path:'postform', component:PostFormComponent},
    
    {path:'**',redirectTo:''}
];
