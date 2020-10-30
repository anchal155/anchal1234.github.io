import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientService, HttpLogInterceptor, HttpTokenInterceptor, CacheInterceptor  } from 'src/app/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomersRoutingModule } from './views/dashboard/pages/customers/customers-routing.module';
import { MaterialModule } from './material.module';
import { DashboardRoutingModule } from './views/dashboard/dashboard-routing.module';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomersRoutingModule,
    DashboardRoutingModule,
    NgbModule,
    GooglePlaceModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar:true,
      progressAnimation:'decreasing',
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
  ],

  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    RouterModule,
    AppRoutingModule,  
    HttpClientService,      
      { provide: HTTP_INTERCEPTORS, useClass:HttpLogInterceptor, multi: true  },
      { provide: HTTP_INTERCEPTORS, useClass:HttpTokenInterceptor, multi: true  },
      { provide: HTTP_INTERCEPTORS, useClass:CacheInterceptor, multi: true  },  
     
  ], 
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
