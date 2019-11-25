import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../translation/translation.module';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectCreateComponent,
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProjectsRoutingModule,
    TranslateModule,
    TranslationModule,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProjectsModule { }
