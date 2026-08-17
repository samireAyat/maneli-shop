import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// import { OverlayModule } from '@angular/cdk/overlay';
// import { PortalModule } from '@angular/cdk/portal';

import { ReactiveFormsModule } from '@angular/forms';
import { SolarIconComponent } from '../shared/components/solar-icon/solar-icon.component';
import { PersianNumberPipe } from '../shared/pipes/persian-number-pipe';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap'



export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SolarIconComponent,
  PersianNumberPipe,
  NgSelectModule,
  NgbTooltip
] as const;