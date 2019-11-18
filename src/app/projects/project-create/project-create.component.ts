import { Project } from '../project.model';
import { ProjectService } from './../project.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  projectTypes = [
    {
      code:'other',
      label: 'Other'
    },
    {
      code:'budget',
      label: 'Budget'
    }
    ,
    {
      code:'purchase',
      label: 'Purchase'
    }
  ];


  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {

    console.log("ProjectCreateComponent");

  }


  onSubmit(createProjectForm: NgForm){

    if (!createProjectForm.valid) {
      return;
    }
    const project = new Project(null, createProjectForm.value.title, createProjectForm.value.type, createProjectForm.value.description,  0);

    this.projectService.createProject(project).subscribe(
      resData => {
        this.router.navigate(['/projects']);
      },
      errorMessage => {
        console.log(errorMessage);

      }
    );

    createProjectForm.reset();

  }
}
