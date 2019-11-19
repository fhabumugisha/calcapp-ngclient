import { Project } from "./../project.model";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "../project.service";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";

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
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params['id'] != null;
    });

    this.projectService.getProject(this.id).subscribe(data => {

      this.project  =  new Project(data._id,data.title, data.type, data.description, data.totalAmount, data.items, data.categories);
      console.log(this.project);

      this.initForm();
    });


  }

  initForm() {
    let title = '';
    let type = '';
    let description = '';
    const items = new FormArray([]);
    const categories = new FormArray([]);
    const categoryItems = new FormArray([]);
    title = this.project.title;
    type = this.project.type;
    description = this.project.description;


    if (this.project['items']) {
      for (const item of this.project.items) {
        items.push(
          new FormGroup({
            title: new FormControl(item.title, Validators.required),
            amount: new FormControl(item.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
      }
    }
    if (this.project['categories']) {
      for (const category of this.project.categories) {
        categories.push(
          new FormGroup({
            title: new FormControl(category.title, Validators.required),
            type: new FormControl(category.type, Validators.required),
            categoryItems : categoryItems
          })
        );
      }
    }
    console.log("creating project form");
    this.projectForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      type: new FormControl(type, Validators.required),
      description: new FormControl(description, Validators.required),
      items: items,
      categories: categories,
    });

  }

  onSubmit() {}



  get itemsControls() {
    return (this.projectForm.get('items') as FormArray).controls;
  }
  get categoriesControls() {
    return (this.projectForm.get('categories') as FormArray).controls;
  }


  onAddItem() {
    (<FormArray>this.projectForm.get('items')).push(
      new FormGroup({
        title: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteItem(index: number) {
    (<FormArray>this.projectForm.get('items')).removeAt(index);
  }

  onAddCategory() {
    (<FormArray>this.projectForm.get('categories')).push(
      new FormGroup({
        title: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required )
      })
    );
  }

  onDeleteCategory(index: number) {
    (<FormArray>this.projectForm.get('categories')).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
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
