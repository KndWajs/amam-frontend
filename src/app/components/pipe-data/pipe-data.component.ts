import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { IngredientCategory } from 'src/app/models/admin/ingredient-category';

@Component({
  selector: 'app-pipe-data',
  templateUrl: './pipe-data.component.html',
  styleUrls: ['./pipe-data.component.css']
})
export class PipeDataComponent implements OnInit {
  ingredients: Array<Ingredient>;
  private allIngredientsSubscription: Subscription;
  private updateIngredientSubscription: Subscription;
  private getCategoriesSubscription: Subscription;
  private addCategoriesSubscription: Subscription;

  ingredient: Ingredient;

  msg: String;

  categories: Array<IngredientCategory>;

  constructor(private readonly ingredientsService: IngredientsService, private readonly adminService: AdminService) { }

  ngOnInit() {
    this.getCategories();
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

  getCategories(): void {
    this.getCategoriesSubscription = this.adminService.getIngredientCategories().subscribe
      (categories => {
        this.categories = categories;
      },
        error => {
          console.log('there is no categories');
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
    this.addCategoriesSubscription = this.ingredient.category = event.srcElement.innerText;
    if(!(event.srcElement.innerText == "dalej")){
      this.updateIngredeint(this.ingredient);
    }    
    if(this.ingredients.length == 0){
      this.msg = "thats all folks!";
    }
    this.ingredient = this.ingredients.pop();
  }

  addCategoryToList(categoryName: string) {
    this.adminService.addIngredientCategory(new IngredientCategory({id: '', category: `${categoryName}`})).subscribe
    (categories => {
      this.getCategories();
    },
      error => {
        console.log('can not add category');
      });
  return;
  }

  ngOnDestroy(): void {
    if (this.allIngredientsSubscription) {
      this.allIngredientsSubscription.unsubscribe();
    }
    if (this.updateIngredientSubscription) {
      this.updateIngredientSubscription.unsubscribe();
    }
    if (this.addCategoriesSubscription) {
      this.addCategoriesSubscription.unsubscribe();
    }
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
  }

}
