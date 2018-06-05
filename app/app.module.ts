import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'


import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

import { PassengerDashboardModule } from './passenger-dashboard/passenger-dashboard.module';


const routes: Routes = [
  {path: '', redirectTo:'passengers', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    //angular modules
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    //custom modules
    PassengerDashboardModule
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }