import { NgModule, Component, enableProdMode } from '@angular/core';
import { Service} from '../../app.service';
import { MealsService } from '../../services/meals.service';
import { Meal } from 'src/app/models/meal';
import { Observable } from 'rxjs';
import { IngredientUnit } from 'src/app/enums/ingredient-unit';
import { Ingredient } from 'src/app/models/ingredient';
import { MealType } from 'src/app/enums/meal-type';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent {

  dataSource: Array<Meal>;
  events: Array<string> = [];

  constructor(service: Service, private readonly mealsService: MealsService) {
      this.getMeals();
     
  }

  getMeals(): void {
      this.mealsService.getMealsFromHttp().subscribe
          (meals => {
              this.dataSource = meals;              
              console.log(meals);              
              console.log(meals[1]);
              console.log(meals[1].typeOfMeal);
              console.log(meals[1].typeOfMeal.toString());
              console.log(meals[1].name);
                       
                       
                            
              // if (!book) {
              //   this.errorMessage = `book with isbn: ${isbn} does not exist`;
              // } else {
              //   this.book = book;
              // }
          },
              error => {
                  console.log('there is no meals');
              });

              return;
  }


  logEvent(eventName) {
      this.events.unshift(eventName);
  }

  clearEvents() {
      this.events = [];
  }

  private currentData;

  rowInserting(e) {
      // delete e.data.id;
      // delete e.data.Head_ID;
      // delete e.data.localization;

      // this.currentData = e.data;
      // e.cancel = new Promise((resolve, reject) => {
      //   this.mealsService.addBeacon(this.currentData).subscribe(
      //     (beacon) => {
      //       e.data = beacon;
      //       resolve();
      //     },
      //     error => {
      //       console.log(error);
      //       let errorDetails = '';
      //       if (typeof error.error === 'string' || error.error instanceof String) {
      //         errorDetails = ' --- ' + error.error;
      //       }
      //       reject(`${error.message} ${errorDetails}`);
      //     });
      // });
  }
}
