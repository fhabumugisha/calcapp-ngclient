import { map } from 'rxjs/operators';
import { ProjectService } from './../project.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'src/app/projects/project.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  PageEvent,
  MatSnackBar,
  MatDialogRef,
  MatDialog
} from '@angular/material';

import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error/error-dialog/error-dialog.component';
import { GenerateService } from '../generate.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  projects: Project[] = [];
  totalProjects = 0;
  projectsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  confirmDeleteDialogRef: MatDialogRef<ConfirmDialogComponent>;
  isLoading = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private generateService: GenerateService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService
      .getProjects(this.projectsPerPage, this.currentPage)
      .subscribe((data: { projects: Project[]; totalItems: number }) => {
        this.projects = data.projects;
        this.totalProjects = data.totalItems;
        this.isLoading =  false;
      });
  }

  onEdit(projectId: string) {
    console.log(projectId);
    this.router.navigate(['/projects', projectId], { relativeTo: this.route });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  onChangedPage(pageData: PageEvent) {
    // this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.projectsPerPage = pageData.pageSize;
    this.projectService
      .getProjects(this.projectsPerPage, this.currentPage)
      .subscribe((data: { projects: Project[]; totalItems: number }) => {
        this.projects = data.projects;
        this.totalProjects = data.totalItems;
      });
  }

  generatePdf(projectId: string) {
    this.projectService.getProject(projectId).subscribe(data => {
      const project: Project = data;
      this.generateService.generatePdf(project);
    });
  }

  generateExcel(project: Project){
    this.generateService.generateExcel(project);
  }

  copy(project: Project) {
    const newProject = {
      ...project,
      _id: null,
       id : null,
       createdAt: null,
       updatedAt: null,
       title : project.title + '(copy)',
       categories: project.categories.map(({_id , ...keepAttrs}) => keepAttrs),
       items: project.items.map(({_id, ...keepAttrs}) => keepAttrs)
    };

    project.categories.forEach(c => {
      c.items.forEach(t => t._id = null);
    });

    console.log(newProject);

this.projectService.createProject(newProject).subscribe(

      resData => {
       // this.router.navigate(['/projects']);
        this.projects.unshift  (resData.project);
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

  }

onDelete(projectId: string) {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: false,
      data: {
        elementToDelete: 'your project'
      }
    });

    this.confirmDeleteDialogRef
      .afterClosed()
      .subscribe((responseData: boolean) => {
        if (responseData) {
          this.isLoading = true;
          this.projectService.deleteProject(projectId).subscribe(
            result => {
              this.projects = this.projects.filter(p => p._id !== projectId);
              this.totalProjects = this.totalProjects - 1;
              this.openSnackBar(result.message, 'Ok');
              this.isLoading = false;
            },
            errorData => {
              this.isLoading = false;
              this.dialog.open(ErrorDialogComponent, {
                hasBackdrop: true,
                data: {
                  message: errorData.message,
                  data: errorData.data
                }
              });
            }
          );
        }
      });
  }

ngOnDestroy() {
    //  this.subscription.unsubscribe();
  }
}
