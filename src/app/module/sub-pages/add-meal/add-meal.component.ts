import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meal } from 'src/app/shared/models/meal';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MealType } from 'src/app/shared/enums/meal-type';
import { PreparingType } from 'src/app/shared/enums/preparing-type';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient';
import { MealsService } from 'src/app/core/services/meals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MealIngredient } from 'src/app/shared/models/meal-ingredient';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit, OnDestroy {
  private addMealSubscription: Subscription;
  private getMealSubscription: Subscription;
  readonly mealTypes: Array<object>;
  readonly preparingTypes: Array<object>;
  newMealForm: FormGroup;
  meal: Meal;
  mealId: number;
  ingredients: FormArray;
  numberOfPeoplee: number;

  constructor(private readonly formBuilder: FormBuilder, private readonly mealsService: MealsService,
    private readonly router: Router, private route: ActivatedRoute, private readonly alertService: AlertService) {
    this.mealTypes = this.buildMealTypesArray();
    this.preparingTypes = this.buildPreparingTypesArray();
    this.numberOfPeoplee = 1;
  }

  ngOnInit() {
    this.newMealForm = this.formBuilder.group({
      name: ['', Validators.required],
      typeOfMeal: ['', Validators.required],
      typeOfPreparing: ['', Validators.required],
      recipe: ['', Validators.required],
      minutesToPrepare: ['', Validators.required],
      ingredients: this.formBuilder.array([])
    });

    this.mealId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (this.mealId <= 0) {
      this.mealId = null;
    } else if (this.mealId) {
      this.getMeal(this.mealId);
    }
  }

  createMealIngredientFormGroup(ingredient: Ingredient, amount: number, mealIngredientId: number): FormGroup {
    let amountParam;
    if (amount == null) {
      amountParam = ['', Validators.required];
    } else {
      amountParam = amount;
    }

    return this.formBuilder.group({
      ingredient,
      id: mealIngredientId,
      amount: amountParam
    });
  }

  addIngredientToFormArray(ingredient: Ingredient, amount: number, mealIngredientId: number): void {
    this.ingredients = this.newMealForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createMealIngredientFormGroup(ingredient, amount, mealIngredientId));
    this.isIngredientsListEmpty();
  }

  deleteIngredientFromFormArray(i: number) {
    this.ingredients.removeAt(i);
    this.isIngredientsListEmpty();
  }

  buildMealTypesArray(): object[] {
    return Object.keys(MealType).map(key => ({ id: MealType[key], name: key }));
  }

  buildPreparingTypesArray(): object[] {
    return Object.keys(PreparingType).map(key => ({ id: PreparingType[key], name: key }));
  }

  goToSearchIngredient(event: any) {
    // TODO reformat
    const element = event.srcElement
      .parentElement.parentElement.parentElement.parentElement
      .nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
    element.focus();
  }

  getMeal(id: number): void {
    this.getMealSubscription =
      this.mealsService.getMealFromHttp(this.mealId as number).subscribe((meal) => {
        this.newMealForm.get('name').setValue(`${meal.name}`);
        this.newMealForm.get('typeOfMeal').setValue(`${meal.typeOfMeal}`);
        this.newMealForm.get('typeOfPreparing').setValue(`${meal.typeOfPreparing}`);
        this.newMealForm.get('recipe').setValue(`${meal.recipe}`);
        this.newMealForm.get('minutesToPrepare').setValue(`${meal.minutesToPrepare}`);
        this.newMealForm.get('name').setValue(`${meal.name}`);

        meal.ingredients.forEach(mealIngredient => {
          this.addIngredientToFormArray(mealIngredient.ingredient, mealIngredient.amount, mealIngredient.id);
        });
      },
        error => {
          console.log(error);
          console.log(this.meal);
        });
  }

  saveMeal(newMealForm): void {
    this.meal = new Meal(newMealForm);
    this.meal.ingredients = this.meal.ingredients.map(ingredient => this.calculateIngredientAmountToOnePerson(ingredient));
    console.log(this.meal);
    if (this.mealId) {
      this.udateMeal();
    } else {
      this.saveNewMeal();
    }
  }

  udateMeal(): void {
    this.meal.id = this.mealId;
    this.addMealSubscription =
      this.mealsService.updateMeal(this.meal).subscribe((meal) => {
        this.router.navigate(['/all-meals/']);
      },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Updating meal'
          );
        }
      );
  }

  saveNewMeal(): void {
    this.addMealSubscription =
      this.mealsService.addMeal(this.meal).subscribe((meal) => {
        this.router.navigate(['/all-meals/']);
      },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Saving new meal'
          );
        }
      );
  }

  calculateIngredientAmountToOnePerson(mealIngredient: MealIngredient): MealIngredient {
    const newMealIngredient: MealIngredient = new MealIngredient(mealIngredient);
    newMealIngredient.amount = mealIngredient.amount / this.numberOfPeoplee;
    return newMealIngredient;
  }

  ngOnDestroy(): void {
    if (this.addMealSubscription) {
      this.addMealSubscription.unsubscribe();
    }
    if (this.getMealSubscription) {
      this.getMealSubscription.unsubscribe();
    }
  }

  isIngredientsListEmpty(): boolean {
    if (!this.ingredients) {
      return true;
    }

    return this.ingredients.value.length === 0;
  }
}
