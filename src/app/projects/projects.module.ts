import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
