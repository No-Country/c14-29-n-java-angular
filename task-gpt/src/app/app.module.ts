import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, "es");

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { Error404Component } from './routes/error404/error404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ComponentNameComponent } from './component-name/component-name.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    Error404Component,
    NavbarComponent,
    HeaderComponent,
    TaskListComponent,
    ComponentNameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
