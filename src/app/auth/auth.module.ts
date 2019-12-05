import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../translation/translation.module';
import { ErrorDialogComponent } from '../shared/error/error-dialog/error-dialog.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes),
    MaterialModule,
    TranslateModule,
    TranslationModule,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ ErrorDialogComponent]
})
export class AuthModule { }
