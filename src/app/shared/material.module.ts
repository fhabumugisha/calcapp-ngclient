import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatBadgeModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatDialogModule,
  MatMenuModule,
  MatProgressSpinnerModule} from '@angular/material';
import { DropdownDirective } from './dropdown.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [DropdownDirective],
  imports: [
    CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatSidenavModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatDialogModule,
      DragDropModule,
      MatMenuModule
  ],
  exports: [
    MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatSidenavModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatDialogModule,
      DragDropModule,
      MatMenuModule
  ]
})
export class MaterialModule { }
