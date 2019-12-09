import { ConfirmDialogComponent } from './../shared/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './../shared/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../projects/projects.module';
import { TranslationModule } from '../translation/translation.module';
import { ErrorDialogComponent } from '../shared/error/error-dialog/error-dialog.component';

const routes: Routes = [
  { path: '', component: MyAccountComponent, canActivate: [AuthGuard],

},

];


@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    TranslationModule,
    MaterialModule
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmDialogComponent , ErrorDialogComponent],
})
export class AccountModule { }
