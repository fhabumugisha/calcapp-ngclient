import { map } from "rxjs/operators";
import { ProjectService } from "./../project.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Project } from "src/app/projects/project.model";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  projects: Project[] = [];
  totalProjects = 0;
  projectsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectService.getProjects(this.projectsPerPage, this.currentPage).subscribe((data : {projects: Project[], totalItems: number}) => {
      this.projects = data.projects;
      this.totalProjects = data.totalItems;

    });
    // this.subscription =   this.projectService.recipesChanged.subscribe(
    //   (projects: Project[]) => {
    //       this.projects = projects;
    //   }
    // );
  }

  onEdit(projectId: string) {
    console.log(projectId);
    this.router.navigate(['/projects', projectId], {relativeTo : this.route});
  }
  onDelete(projectId: string) {
    this.projectService.deleteProject(projectId).subscribe(result => {
      this.projects = this.projects.filter(p => p._id !== projectId);
    //   this.projectService.getProjects(this.projectsPerPage, this.currentPage)
    // .subscribe((data : {projects: Project[], totalItems: number}) => {
    //   this.projects = data.projects;
    //   this.totalProjects = data.totalItems;

    // });
    });
  }

  onChangedPage(pageData: PageEvent) {
   // this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.projectsPerPage = pageData.pageSize;
    this.projectService.getProjects(this.projectsPerPage, this.currentPage)
    .subscribe((data : {projects: Project[], totalItems: number}) => {
      this.projects = data.projects;
      this.totalProjects = data.totalItems;

    });
  }

  ngOnDestroy() {
    //  this.subscription.unsubscribe();
  }
}
