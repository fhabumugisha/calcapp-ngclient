import { Project } from "./../project.model";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "../project.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.css"]
})
export class EditProjectComponent implements OnInit {
  id: string;
  editMode = false;
  project: Project;
  projectForm: FormGroup;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params['id'] != null;

      this.projectService.getProject(this.id).subscribe(project => {
        this.project = project;
      });

      console.log(this.project);

      this.initForm();
    });
  }

  initForm() {


  }

  onSubmit() {}

  projectTypes = [
    {
      code: "other",
      label: "Other"
    },
    {
      code: "budget",
      label: "Budget"
    },
    {
      code: "purchase",
      label: "Purchase"
    }
  ];
}
