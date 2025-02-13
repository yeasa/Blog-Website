import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [CommonModule,DialogModule,ButtonModule,FormsModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
  providers:[]
})
export class DialogBoxComponent {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() header: string = 'Dialog';
  
  @Input() fields: { label: string; key: string; type: string }[] = [];
  @Input() model: any = {};  

  @Output() save = new EventEmitter<any>();

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
  
  saveData() {
    this.save.emit(this.model);
    this.closeDialog();
  }

}
