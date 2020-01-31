import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Observable, Subject } from 'rxjs';
import { MealsService } from 'src/app/services/meals.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MenuMeal } from 'src/app/models/menu-meals';

@Component({
  selector: 'app-quick-search-meal',
  templateUrl: './quick-search-meal.component.html',
  styleUrls: ['./quick-search-meal.component.css']
})
export class QuickSearchMealComponent implements OnInit {
  meal: Meal;
  addMealMessage: string;

  private readonly NUMBER_OF_SHOWN_RESULT = 10;
  meals$: Observable<Array<Meal>>;
  private readonly searchTerms = new Subject<string>();
  searchBoxText: string;
  dayNumber: number;

  @Output() readonly emitableMenuMeal = new EventEmitter<MenuMeal>();

  constructor(private readonly mealService: MealsService) {
    this.dayNumber = 1;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.meals$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.mealService.getMealsByPartialName(term, this.NUMBER_OF_SHOWN_RESULT))
    );
  }

  choseMeal(meal: Meal): void {
    this.search('');
    this.searchBoxText = meal.name;
    this.meal = meal;
  }

  emitMenuMeal(): void {
    this.search('');
    this.searchBoxText = "";    
    this.emitableMenuMeal.emit(new MenuMeal({meal: this.meal, dayNumber: this.dayNumber}));
  }

  ngOnDestroy(): void {
    // if (this.addMealSubscription) {
    //   this.addMealSubscription.unsubscribe();
    // }
  }

}
