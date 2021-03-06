import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MenuParameters } from 'src/app/shared/models/menu-parameters';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MealType } from 'src/app/shared/enums/meal-type';
import { MenusService } from 'src/app/core/services/menus.service';
import { Menu } from 'src/app/shared/models/menu';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-create-menu-parameters',
  templateUrl: './create-menu-parameters.component.html',
  styleUrls: ['./create-menu-parameters.component.css']
})
export class CreateMenuParametersComponent implements OnInit, OnDestroy {
  private addMenuParametersSubscription: Subscription;
  newMenuParametersForm: FormGroup;
  menuParameters: MenuParameters;
  waitingForMenu: boolean;

  @Output() readonly emitableMenuMeals = new EventEmitter<Menu>();

  mealsList = [
    { id: 1, name: 'BREAKFAST' },
    { id: 2, name: 'LUNCH' },
    { id: 3, name: 'SNACK' },
    { id: 4, name: 'DINNER' },
    { id: 5, name: 'SNACK' },
    { id: 6, name: 'SUPPER' }
  ];

  constructor(private readonly formBuilder: FormBuilder, private readonly menuService: MenusService,
              private readonly alertService: AlertService)  {
    this.waitingForMenu = false;
  }

  private addCheckboxes() {
    this.mealsList.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.newMenuParametersForm.controls.mealTypes as FormArray).push(control);
    });
  }

  ngOnInit() {
    this.newMenuParametersForm = this.formBuilder.group({
      name: ['', Validators.required],
      numberOfDays: ['', Validators.required],
      numberOfPersons: ['', Validators.required],
      isDinnerForTwoDays: [''],
      mealTypes: this.formBuilder.array([])
    });
    this.addCheckboxes();
  }

  createNewMenuProposal(newMenuParametersForm): void {
    this.waitingForMenu = true;
    this.menuParameters = new MenuParameters(newMenuParametersForm);

    this.menuParameters.mealTypes = this.newMenuParametersForm.value.mealTypes
    .map((v, i) => v ? this.mealsList[i].name as MealType : null)
    .filter(v => v !== null);

    this.addMenuParametersSubscription =
      this.menuService.createMenu(this.menuParameters).subscribe((menu) => {
          this.emitMenuMeals(menu);
          this.waitingForMenu = false;
          this.alertService.success(`menu proposal ${menu.name} was created`, {
            autoClose: true
          });
       },
       error => {
          this.waitingForMenu = false;
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Create menu proposal'
          );
       });
  }

  emitMenuMeals(menu: Menu): void {
    this.emitableMenuMeals.emit(menu);
  }

  ngOnDestroy(): void {
    if (this.addMenuParametersSubscription) {
      this.addMenuParametersSubscription.unsubscribe();
    }
  }
}
