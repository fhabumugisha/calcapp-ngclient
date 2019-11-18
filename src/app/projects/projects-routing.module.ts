import { NgModule } from '@angular/core';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { AuthGuard } from './../auth/auth.guard';
import { ProjectListComponent } from './project-list/project-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: ProjectListComponent, canActivate: [AuthGuard],
    //   children: [
    //   { path: 'new', component: ProjectCreateComponent, canActivate: [AuthGuard] },
    // ]
  },
  { path: 'new', component: ProjectCreateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
