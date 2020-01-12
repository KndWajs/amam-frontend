import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MealType } from 'src/app/enums/meal-type';
import { PreparingType } from 'src/app/enums/preparing-type';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientUnit } from 'src/app/enums/ingredient-unit';
import { MealsService } from 'src/app/services/meals.service';
import { Router } from '@angular/router';
import { MealIngredient } from 'src/app/models/meal-ingredient';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  private addMealSubscription: Subscription;
  readonly mealTypes: Array<Object>;
  readonly preparingTypes: Array<Object>;
  newMealForm: FormGroup;
  meal: Meal;
  ingredients: FormArray;
  numberOfPeoplee: number;

  constructor(private readonly formBuilder: FormBuilder, private readonly mealsService: MealsService, private readonly router: Router) {
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
  }

  createMealIngredientFormGroup(ingredient: Ingredient, name: string, unit: IngredientUnit): FormGroup {
    return this.formBuilder.group({
      ingredient: ingredient,
      ingredientName: name,
      ingredientUnit: unit,
      amount: ['', Validators.required]
    });
  }

  addIngredientToFormArray(ingredient: Ingredient): void {
    this.ingredients = this.newMealForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createMealIngredientFormGroup(ingredient, ingredient.name, ingredient.ingredientUnit));
    this.isIngredientsListEmpty();
  }

  deleteIngredientFromFormArray(i: number) {
    this.ingredients.removeAt(i);
    this.isIngredientsListEmpty();
  }

  buildMealTypesArray(): Object[] {
    return Object.keys(MealType).map(key => ({ id: MealType[key], name: key }))
  }

  buildPreparingTypesArray(): Object[] {
    return Object.keys(PreparingType).map(key => ({ id: PreparingType[key], name: key }))
  }

  goToSearchIngredient(event: any) {
    //TODO reformat
    let element = event.srcElement
      .parentElement.parentElement.parentElement.parentElement
      .nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
    element.focus();

  }

  saveNewMeal(newMealForm): void {
    this.meal = new Meal(newMealForm);
    this.meal.ingredients = this.meal.ingredients.map(ingredient => this.calculateIngredientAmountToOnePerson(ingredient));
    console.log(this.meal);
    this.addMealSubscription =
      this.mealsService.addMeal(this.meal).subscribe((meal) => {
        console.log("meal added succesfully");
        console.log(meal);
        this.router.navigate(['/all-meals/']);
      },
        error => {
          console.log(error);
          console.log(this.meal);
        });
  }

  calculateIngredientAmountToOnePerson(mealIngredient: MealIngredient): MealIngredient {
    let newMealIngredient: MealIngredient = new MealIngredient(mealIngredient);
    newMealIngredient.amount = mealIngredient.amount / this.numberOfPeoplee;
    return newMealIngredient;
  }

  ngOnDestroy(): void {
    if (this.addMealSubscription) {
      this.addMealSubscription.unsubscribe();
    }
  }

  isIngredientsListEmpty(): boolean {
    if (!this.ingredients) {
      return true;
    }

    return this.ingredients.value.length == 0;
  }
}
