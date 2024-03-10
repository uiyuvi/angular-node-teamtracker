// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { RoutingComponents } from './app-routing.module';

// Service
import { TrackerRequestsService } from './service/tracker-requests.service';

//Interceptor
import { HttpConfigInterceptor } from './interceptor/http-config.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    NavbarComponent
  ],
  imports: [
    CommonModule,                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    TrackerRequestsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
