import { map } from "rxjs/operators";
import { ProjectService } from "./../project.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Project } from "src/app/projects/project.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
    // this.subscription =   this.projectService.recipesChanged.subscribe(
    //   (projects: Project[]) => {
    //       this.projects = projects;
    //   }
    // );
  }

  onEdit(projectId: string) {
    console.log(projectId);
  }
  onDelete(projectId: string) {
    this.projectService.deleteProject(projectId).subscribe(result => {
      this.projects = this.projects.filter(p => p.id !== projectId);
    });
  }
  ngOnDestroy() {
    //  this.subscription.unsubscribe();
  }
}
