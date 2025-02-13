import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarBasicDemo } from './components/header/header.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenubarBasicDemo,RouterOutlet],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
