import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pipe-data',
  templateUrl: './pipe-data.component.html',
  styleUrls: ['./pipe-data.component.css']
})
export class PipeDataComponent implements OnInit {
  ingredients: Array<Ingredient>;
  private allIngredientsSubscription: Subscription;
  private updateIngredientSubscription: Subscription;

  ingredient: Ingredient;

  msg: String;

  categories: Array<String> = ["nabiał", "mrożonki", "warzywa", "owoce", "dania_gotowe", "słodycze", "napoje", "wędliny", "mięso", "pieczywo", "sery"];

  constructor(private readonly ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.getIngredients();

  }

  getIngredients(): void {
    this.allIngredientsSubscription = this.ingredientsService.getIngredientsFromHttp().subscribe
      (ingredients => {
        this.ingredients = ingredients;
        this.ingredient = this.ingredients.pop();
      },
        error => {
          console.log('there is no ingredients');
        });
    return;
  }

  updateIngredeint(ingr: Ingredient): void {
    this.updateIngredientSubscription = this.ingredientsService.updateIngredient(ingr).subscribe
      (ingredient => {
        console.log('update successful');
      },
        error => {
          console.log('update failed');
        });
    return;
  }

  addIngredientCategory(event) {
    this.ingredient.category = event.srcElement.innerText;
    if(!(event.srcElement.innerText == "dalej")){
      this.updateIngredeint(this.ingredient);
    }    
    if(this.ingredients.length == 0){
      this.msg = "thats all folks!";
    }
    this.ingredient = this.ingredients.pop();
  }

  addCategoryToList(category: string) {
    this.categories.push(category);
  }

  ngOnDestroy(): void {
    if (this.allIngredientsSubscription) {
      this.allIngredientsSubscription.unsubscribe();
    }
    if (this.updateIngredientSubscription) {
      this.updateIngredientSubscription.unsubscribe();
    }
  }

}
