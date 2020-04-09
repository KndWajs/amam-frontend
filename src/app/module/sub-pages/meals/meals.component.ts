import { NgModule, Component, enableProdMode, Input } from "@angular/core";
import { MealsService } from "../../../core/services/meals.service";
import { Meal } from "src/app/shared/models/meal";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from "src/app/core/services/alert.service";

@Component({
  selector: "app-meals",
  templateUrl: "./meals.component.html",
  styleUrls: ["./meals.component.css"]
})
export class MealsComponent {
  dataSource: Array<Meal>;
  events: Array<string> = [];

  private allMealsSubscription: Subscription;
  private deleteMealSubscription: Subscription;

  constructor(
    private readonly mealsService: MealsService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {
    this.getMeals();

    this.test();
  }

  test(): void {
    this.mealsService.getTest().subscribe(
      test => {
        console.log(test);
      },
      error => {
        this.alertService.createErrorMessageForHttpResponseWithTitle(
          error,
          "Get meals"
        );
      }
    );

    return;
  }

  getMeals(): void {
    this.allMealsSubscription = this.mealsService.getMealsFromHttp().subscribe(
      meals => {
        if (!meals) {
          this.alertService.warn("User don't have any meals!", {
            autoClose: true
          });
          this.dataSource = new Array();
        } else {
          this.dataSource = meals;
        }
      },
      error => {
        this.alertService.createErrorMessageForHttpResponseWithTitle(
          error,
          "Get meals"
        );
      }
    );

    return;
  }

  duplicate(e: any): void {
    this.router.navigate([`/add-meal/${e.data.id}`]);
    console.log(e.data.id);
  }

  onRowRemoving(e: any): void {
    e.cancel = new Promise((resolve, reject) => {
      this.deleteMealSubscription = this.mealsService
        .deleteMeal(e.data.id)
        .subscribe(
          meal => {
            this.alertService.warn(`meal ${meal.name} was deleted`, {
                autoClose: true
              });
            resolve();
          },
          error => {
            this.alertService.createErrorMessageForHttpResponseWithTitle(
              error,
              "Delete meal"
            );
          }
        );
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
}
