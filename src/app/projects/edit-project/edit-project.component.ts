
import { Item } from './../item.model';
import { Project } from './../project.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../project.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ErrorDialogComponent } from 'src/app/shared/error/error-dialog/error-dialog.component';
import { Category } from '../category.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}



  id: string;
  editMode = false;
  project: Project;
  messageAction = '';
  projectForm: FormGroup;
  panelOpenState = false;

  displayedColumns = ['item', 'description', 'cost', 'actions'];
  editCatelogDialogRef: MatDialogRef<EditCategoryComponent>;
  editItemDialogRef: MatDialogRef<EditItemComponent>;

  indexOpenedCateg: any;

  setIndexOpenedCateg(index: any){
    this.indexOpenedCateg = index;
  }
  get itemsControls() {
    return (this.projectForm.get('items') as FormArray).controls;
  }
  get categoriesControls() {
    return (this.projectForm.get('categories') as FormArray).controls;
  }

  getCategoriesControlsByType(type: string) {
    const controls  = (this.projectForm.get('categories') as FormArray).controls;
    const controlsFiltered = controls.filter(ctlr => ctlr.value.type === type);
    console.log(controlsFiltered);
    return controlsFiltered;
  }
  get projectTypes() {
    return this.projectService.getProjectTypes();
  }

  get categoryTypes() {
    return this.projectService.getCategoryTypes();
  }


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.editMode = params.id != null;
    });

    this.projectService.getProject(this.id).subscribe(data => {
      this.project  =  data;
      this.initForm();
    });


  }

  private initForm() {

    let title = '';
    let type = '';
    let description = '';
    let totalAmount = 0;
    const itemsControls = new FormArray([]);
    const categoriesControls = new FormArray([]);

    title = this.project.title;
    type = this.project.type;
    description = this.project.description;
    totalAmount = this.project.totalAmount;

    if (this.project.items) {
      for (const item of this.project.items) {
        console.log(item);

        itemsControls.push(
          new FormGroup({
            title: new FormControl(item.title, Validators.required),
            amount: new FormControl(item.amount, [
              Validators.required,
              Validators.pattern(/^\d+\.?\d{0,2}$/)
            ]),
            description: new FormControl(item.description)

          })
        );
      }
    }
    if (this.project.categories) {
      const incomes: Category[] =  this.project.categories.filter( c => c.type === 'Income');
      const expenses: Category[] =  this.project.categories.filter( c => c.type === 'Expenses');

      for (const category of incomes) {
        buildCategoriesList(category, categoriesControls);
      }

      for (const category of expenses) {
        buildCategoriesList(category, categoriesControls);

      }
    }

    this.projectForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      type: new FormControl( {value: type, disabled: true} , Validators.required),
      description: new FormControl(description, Validators.required),
      totalAmount: new FormControl({value: totalAmount, disabled: true}, Validators.required),
      items: itemsControls,
      categories: categoriesControls,
    });

  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.projectService.updateProject(this.id, this.projectForm.value)
    .subscribe(data => {
      this.project =  data.project;
      this.messageAction = data.message;
      this.openSnackBar(this.messageAction, 'Ok');
      this.initForm();

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
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
 }

  getCategoryItemsControls(categoryCtrl) {
  return (categoryCtrl.get('items') as FormArray).controls;
  }



  onDeleteItem(index: number) {
    ( this.projectForm.get('items') as FormArray).removeAt(index);
    this.onSubmit();
  }


 onDeleteCategoryItem(categoryCtrl, index: number) {
  categoryCtrl.get('items').removeAt(index);
  this.onSubmit();
  }


  onDeleteCategory(index: number) {
    ( this.projectForm.get('categories') as FormArray).removeAt(index);
    this.onSubmit();
  }



  onEditCategoryDialog(index?: number, categoryCtrl?) {
    this.editCatelogDialogRef = this.dialog.open(EditCategoryComponent, {
      hasBackdrop: true,
      data : {
        title : categoryCtrl ? categoryCtrl.value.title : '',
        type : categoryCtrl ? categoryCtrl.value.type : '',
        description : categoryCtrl ? categoryCtrl.value.description : ''
      }
    });
    this.editCatelogDialogRef
        .afterClosed()
        .subscribe((categoryFormData: {title: string, type: string, description: string}) => {
          if (categoryFormData) {

            if (index !== undefined) {
              ( this.projectForm.get('categories') as FormArray).removeAt(index);
              this.indexOpenedCateg = index;

            }
            ( this.projectForm.get('categories') as FormArray).push(
              new FormGroup({
                title: new FormControl(categoryFormData.title, Validators.required),
                type: new FormControl(categoryFormData.type, Validators.required ),
                description: new FormControl(categoryFormData.description),
                items : categoryCtrl ? categoryCtrl.get('items') : new FormArray([]),
                totalAmount : categoryCtrl ? new FormControl(categoryCtrl.value.totalAmount ) : new FormControl(0)
              })
            );
            this.onSubmit();

          }

        });
  }

  onEditCategoryItemDialog(categoryCtrl, indexItem?: number, item?: Item) {
    this.editItemDialogRef = this.dialog.open(EditItemComponent, {
      hasBackdrop: true,
      data : {
        _id: item ? item._id : '',
        title : item ? item.title : '',
        amount : item ? item.amount : '',
        description: item ? item.description : ''
      }
    });

    this.editItemDialogRef
    .afterClosed()
    .subscribe((itemFormData: {_id: string, title: string, amount: number, description: string}) => {
      if (itemFormData) {

        if (indexItem !== undefined) {
          categoryCtrl.get('items').removeAt(indexItem);
        }
        categoryCtrl.get('items').push( new FormGroup({

          title: new FormControl(itemFormData.title, Validators.required),
          amount: new FormControl(itemFormData.amount, [
            Validators.required,
            Validators.pattern(/^\d+\.?\d{0,2}$/)
          ]),
          description: new FormControl(itemFormData.description),
        }));

        this.onSubmit();
      }

    });
  }

  onEditProjectItemDialog( indexItem?: number, item?: Item) {
    console.log('item : ', item);

    this.editItemDialogRef = this.dialog.open(EditItemComponent, {
      hasBackdrop: false,
      data : {
        _id: item ? item._id : '',
        title : item ? item.title : '',
        amount : item ? item.amount : '',
        description: item ? item.description : ''
      }
    });

    this.editItemDialogRef
    .afterClosed()
    .subscribe((itemFormData: {_id: string, title: string, amount: number, description: string}) => {
      if (itemFormData) {

        if (indexItem !== undefined) {
          ( this.projectForm.get('items') as FormArray).removeAt(indexItem);
        }
        ( this.projectForm.get('items') as FormArray).push( new FormGroup({

          title: new FormControl(itemFormData.title, Validators.required),
          amount: new FormControl(itemFormData.amount, [
            Validators.required,
            Validators.pattern(/^\d+\.?\d{0,2}$/)
          ]),
          description: new FormControl(itemFormData.description),
        }));

        this.onSubmit();
      }

    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



}



function buildCategoriesList(category: Category, categoriesControls: FormArray) {
  const categoryItems = new FormArray([]);
  if (category.items) {
    for (const item of category.items) {
      categoryItems.push(new FormGroup({
        title: new FormControl(item.title, Validators.required),
        amount: new FormControl(item.amount, [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)]),
        description: new FormControl(item.description),
      }));
    }
  }
  categoriesControls.push(new FormGroup({
    title: new FormControl(category.title, Validators.required),
    type: new FormControl(category.type, Validators.required),
    items: categoryItems,
    totalAmount: new FormControl(category.totalAmount),
    description: new FormControl(category.description),
  }));
}

