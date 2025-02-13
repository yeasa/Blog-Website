import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
// import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
    selector: 'menubar-basic-demo',
    standalone: true,
    imports: [CommonModule, TabMenuModule], 
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class MenubarBasicDemo implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink:['']
            },
            {
                label: 'Users',
                icon: 'pi pi-star',
                routerLink:['/users'],
                queryParams:{status:'active'} ,
                // items:[
                //     { label: 'Active Users', icon: 'pi pi-server',routerLink:['/users'], queryParams:{status:'active'} },
                //     { label: 'Deleted Users', icon: 'pi pi-trash',routerLink:['/users'] , queryParams:{status:'deleted'} },
                //     { label: 'All Users', icon: 'pi pi-bolt',routerLink:['/users'], queryParams:{status:'all'}  },
                // ]
            },
            {
                label: 'Posts',
                icon: 'pi pi-star',
                routerLink:['/posts'],
                // items:[
                //     { label: 'Published Posts', icon: 'pi pi-bolt',routerLink:['/posts'],queryParams:{status:'published'} },
                //     { label: 'Deleted Posts', icon: 'pi pi-trash',routerLink:['/posts'],queryParams:{status:'deleted'} },
                //     { label: 'All Posts', icon: 'pi pi-server',routerLink:['/posts'],queryParams:{status:'all'}  },
                // ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                routerLink:['/contact'],
            }
        ];
    }
}

