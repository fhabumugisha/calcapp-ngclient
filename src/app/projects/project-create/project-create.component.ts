import { Project } from '../project.model';
import { ProjectService } from './../project.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error/error-dialog/error-dialog.component';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {



  constructor(private projectService: ProjectService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {


  }


  onSubmit(createProjectForm: NgForm) {

    if (!createProjectForm.valid) {
      return;
    }
    const project = new Project(createProjectForm.value.title, createProjectForm.value.type, createProjectForm.value.description,  0);

    this.projectService.createProject(project).subscribe(
      resData => {
        this.router.navigate(['/projects']);
      },
      errorData => {
        console.log(errorData.message);
        this.dialog.open(ErrorDialogComponent, {
          hasBackdrop: true,
          data : {
            message : errorData.message,
            data : errorData.data
          }
        });

      }
    );

    createProjectForm.reset();

  }

  get projectTypes() {
    return this.projectService.getProjectTypes();
  }



}
