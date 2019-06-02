import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserHomePage } from './user-home.page';
import { UserHomeRoutingModule } from './user-home-routing.module';
import { RecordPageModule } from './record/record.module';

const routes: Routes = [
  {
    path: '',
    component: UserHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHomeRoutingModule
  ],
  declarations: [UserHomePage]
})
export class UserHomePageModule {}
