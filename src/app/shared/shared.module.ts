import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './heading/heading.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [HeadingComponent, SidebarComponent, HeaderComponent],
  imports: [
    CommonModule,
  ],
  exports:[HeadingComponent, SidebarComponent, HeaderComponent]
})
export class SharedModule { }
