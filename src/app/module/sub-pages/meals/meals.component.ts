import { NgModule, Component, enableProdMode, Input } from '@angular/core';
import { MealsService } from '../../../core/services/meals.service';
import { Meal } from 'src/app/shared/models/meal';
import { Observable, Subscription } from 'rxjs';
import { IngredientUnit } from 'src/app/shared/enums/ingredient-unit';
import { Ingredient } from 'src/app/shared/models/ingredient';
import { MealType } from 'src/app/shared/enums/meal-type';
import { Router } from '@angular/router';

@Component({
    selector: 'app-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.css']
})
export class MealsComponent {
    dataSource: Array<Meal>;
    events: Array<string> = [];

    private allMealsSubscription: Subscription;
    private deleteMealSubscription: Subscription;

    constructor(private readonly mealsService: MealsService, private readonly router: Router) {
        this.getMeals();
    }

    getMeals(): void {
        this.allMealsSubscription = this.mealsService.getMealsFromHttp().subscribe
            (meals => {
                this.dataSource = meals;
                // if (!book) {
                //   this.errorMessage = `book with isbn: ${isbn} does not exist`;
                // } else {
                //   this.book = book;
                // }
            },
                error => {
                    console.log(error);
                    console.log(error.error.toString());
                    
                    console.log('there is no meals');
                });

        return;
    }

    duplicate(e: any): void {
        this.router.navigate([`/add-meal/${e.data.id}`]);
        console.log(e.data.id)
    }

    onRowRemoving(e: any): void {
        e.cancel = new Promise((resolve, reject) => {
            this.deleteMealSubscription = this.mealsService.deleteMeal(e.data.id).subscribe(
                (meal) => {
                   console.log("done");
                    resolve();
                },
                error => {
                    console.log(error);
                    let errorDetails = '';
                    if (typeof error.error === 'string' || error.error instanceof String) {
                        errorDetails = ' --- ' + error.error;
                    }
                    reject(`${error.message} ${errorDetails}`);
                });
        });
    }

    onRowClick(e) {
        if (e.rowType == "data") {
          if (e.isExpanded) {
            e.component.collapseRow(e.key);
          } else {
            e.component.collapseAll(-1);
            e.component.expandRow(e.key);
          }
        }
      }

    ngOnDestroy(): void {
        if (this.allMealsSubscription) {
            this.allMealsSubscription.unsubscribe();
        }
        if (this.deleteMealSubscription) {
            this.deleteMealSubscription.unsubscribe();
        }
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