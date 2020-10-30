import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FrontendComponent } from './frontend.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [FrontendComponent,HomeComponent,HeaderComponent, RegisterComponent,FooterComponent,LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FrontendRoutingModule,
   
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FrontendModule { }
