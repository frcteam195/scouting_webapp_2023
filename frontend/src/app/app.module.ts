import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { Level1Component } from './modules/level1/level1.component';
import { Level2Component } from './modules/level2/level2.component';
import { PitComponent } from './modules/pit/pit.component';
import { AdminComponent } from './modules/admin/admin.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PitListComponent } from './modules/pit-list/pit-list.component';
import { Level2ListComponent } from './modules/level2-list/level2-list.component';
import { DebugComponent } from './modules/debug/debug.component';
import { LoginComponent } from './modules/login/login.component';
import { FanInputComponent } from './fan-input/fan-input.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Level1Component,
    Level2Component,
    PitComponent,
    AdminComponent,
    PitListComponent,
    Level2ListComponent,
    DebugComponent,
    LoginComponent,
    FanInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
