import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddnameComponent } from './addname/addname.component';
import { AddtodoComponent } from './addtodo/addtodo.component';
import { ParticlesComponent } from './particles/particles.component';

@NgModule({
  declarations: [
    AppComponent,
    AddnameComponent,
    AddtodoComponent,
    ParticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularDateTimePickerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
