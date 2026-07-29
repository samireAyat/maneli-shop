import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ReactiveFormsModule } from '@angular/forms';
import { SolarIconComponent } from '../shared/components/solar-icon/solar-icon.component';
import { PersianNumberPipe } from '../shared/pipes/persian-number-pipe'


export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SolarIconComponent,
  PersianNumberPipe,
  NgSelectModule

] as const;