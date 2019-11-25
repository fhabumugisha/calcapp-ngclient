import { Project } from "./../project.model";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "../project.service";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.css"]
})
export class EditProjectComponent implements OnInit {
  id: string;
  editMode = false;
  project: Project;
  messageAction = '';
  projectForm : FormGroup;
  panelOpenState = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
    });

    this.projectService.getProject(this.id).subscribe(data => {
      this.project  =  data;
      this.initForm();
    });


  }

  private initForm() {
    console.log('initForm');

    let title = '';
    let type = '';
    let description = '';
    const itemsControls = new FormArray([]);
    const categoriesControls = new FormArray([]);

    title = this.project.title;
    type = this.project.type;
    description = this.project.description;


    if (this.project['items']) {
      for (const item of this.project.items) {
        itemsControls.push(
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
        const  categoryItems = new FormArray([]);
        if(category['items']){
          for (const item of category.items) {
            categoryItems.push(
            new FormGroup({
              title: new FormControl(item.title, Validators.required),
              amount: new FormControl(item.amount, Validators.required)
            })
          );
          }
        }
        categoriesControls.push(
          new FormGroup({
            title: new FormControl(category.title, Validators.required),
            type: new FormControl(category.type, Validators.required),
            items : categoryItems,
            totalAmount : new FormControl(category.totalAmount),
          })
        );
      }
    }

    this.projectForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      type: new FormControl( {value: type, disabled: true} , Validators.required),
      description: new FormControl(description, Validators.required),
      items: itemsControls,
      categories: categoriesControls,
    });

  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.projectService.updateProject(this.id, this.projectForm.value).subscribe(data => {
      this.project =  data.project;
      this.messageAction = data.message;
      this.panelOpenState =  false;
    this.openSnackBar(this.messageAction, "Ok");
    this.router.navigate(['../projects',this.project._id, 'edit'], { skipLocationChange: true});

    });

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
 }


  get itemsControls() {
    return (this.projectForm.get('items') as FormArray).controls;
  }
  get categoriesControls() {
    return (this.projectForm.get('categories') as FormArray).controls;
  }

  getCategoryItemsControls(categoryCtrl){
  return (categoryCtrl.get('items') as FormArray).controls;
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
        title: new FormControl('New category', Validators.required),
        type: new FormControl(null, Validators.required ),
        items : new FormArray([]),
        totalAmount : new FormControl(0)
      })
    );
  }


  onAddCategoryItem(categoryCtrl){
    categoryCtrl.get("items").push( new FormGroup({
      title: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }
onDeleteCategoryItem(categoryCtrl,index: number) {
  categoryCtrl.get('items').removeAt(index);
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

  categoryTypes = [
    {
      code: "other",
      label: "Other"
    },
    {
      code: "revenue",
      label: "Revenue"
    },
    {
      code: "spent",
      label: "Spent"
    }
  ];
}
