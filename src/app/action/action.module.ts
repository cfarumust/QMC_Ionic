import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionPageRoutingModule } from './action-routing.module';

import { ActionPage } from './action.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionPageRoutingModule,
    IonicSelectableModule,
    IonicStorageModule.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ActionPage]
})
export class ActionPageModule {}
