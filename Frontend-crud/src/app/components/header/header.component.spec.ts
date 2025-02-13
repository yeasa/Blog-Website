import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarBasicDemo } from './header.component';

describe('HeaderComponent', () => {
  let component: MenubarBasicDemo;
  let fixture: ComponentFixture<MenubarBasicDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenubarBasicDemo]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenubarBasicDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
