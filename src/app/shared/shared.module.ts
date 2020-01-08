
import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../projects/projects.module';
import { HttpClient } from '@angular/common/http';
import { TranslationModule } from '../translation/translation.module';
import { ErrorDialogComponent } from './error/error-dialog/error-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]
    }
  }),
  TranslationModule],
  exports: [CommonModule, MaterialModule, TranslateModule, TranslationModule],
  declarations: [ErrorDialogComponent, ConfirmDialogComponent],
  providers: [],
})
export class SharedModule { }

