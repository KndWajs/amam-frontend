import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuParameters } from 'src/app/models/menu-parameters';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MealType } from 'src/app/enums/meal-type';
import { MenusService } from 'src/app/services/menus.service';
import { Meal } from 'src/app/models/meal';
import { MenuMeal } from 'src/app/models/menu-meals';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-create-menu-parameters',
  templateUrl: './create-menu-parameters.component.html',
  styleUrls: ['./create-menu-parameters.component.css']
})
export class CreateMenuParametersComponent implements OnInit {
  private addMenuParametersSubscription: Subscription;
  newMenuParametersForm: FormGroup;
  menuParameters: MenuParameters;

  @Output() readonly emitableMenuMeals = new EventEmitter<Menu>();

  mealsList = [
    { id: 1, name: 'BREAKFAST' },
    { id: 2, name: 'LUNCH' },
    { id: 3, name: 'SNACK' },
    { id: 4, name: 'DINNER' },
    { id: 5, name: 'SNACK' },
    { id: 6, name: 'SUPPER' }
  ];

  constructor(private readonly formBuilder: FormBuilder, private readonly menuService: MenusService) {

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
      mealTypes: this.formBuilder.array([])
    });
    this.addCheckboxes();
  }

  saveNewMenu(newMenuParametersForm): void {
    this.menuParameters = new MenuParameters(newMenuParametersForm);

    this.menuParameters.mealTypes = this.newMenuParametersForm.value.mealTypes
    .map((v, i) => v ? this.mealsList[i].name as MealType : null)
    .filter(v => v !== null);

    this.addMenuParametersSubscription =
      this.menuService.createMenu(this.menuParameters).subscribe((menu) => {
          console.log("menu created");
          console.log(menu);
          this.emitMenuMeals(menu);
       },
       error => {
           console.log(error);
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
