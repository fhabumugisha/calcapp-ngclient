import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { TranslateModule, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslationModule } from '../translation/translation.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { EditCategoryComponent } from './edit-project/edit-category/edit-category.component';
import { EditItemComponent } from './edit-project/edit-item/edit-item.component';
import { ErrorDialogComponent } from '../shared/error/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectCreateComponent,
    EditProjectComponent,
    EditCategoryComponent,
    EditItemComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    SharedModule,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [EditCategoryComponent, EditItemComponent, ErrorDialogComponent, ConfirmDialogComponent],

  providers: [

  ]
})
export class ProjectsModule { }
