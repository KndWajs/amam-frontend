import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ShoppingElement } from 'src/app/models/shopping-element';
import { Ingredient } from 'src/app/models/ingredient';
import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-quick-search-shopping-element',
  templateUrl: './quick-search-shopping-element.component.html',
  styleUrls: ['./quick-search-shopping-element.component.css']
})
export class QuickSearchShoppingElementComponent implements OnInit {
  ingredient: Ingredient;
  addIngredientMessage: string;

  private readonly NUMBER_OF_SHOWN_RESULT = 10;
  ingredients$: Observable<Array<Ingredient>>;
  private readonly searchTerms = new Subject<string>();
  searchBoxText: string;
  amount: number;

  @Output() readonly emitableShoppingElement = new EventEmitter<ShoppingElement>();

  constructor(private readonly ingredientService: IngredientsService) {
    this.amount = 1;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.ingredients$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.ingredientService.getIngredientsByPartialName(term, this.NUMBER_OF_SHOWN_RESULT))
    );
  }

  choseIngredient(ingredient: Ingredient): void {
    this.search('');
    this.searchBoxText = ingredient.name;
    this.ingredient = ingredient;
  }

  emitShoppingElement(): void {
    this.search('');
    this.searchBoxText = "";    
    this.emitableShoppingElement.emit(new ShoppingElement({ingredient: this.ingredient, amount: this.amount, alreadyBought: false}));
  }

  ngOnDestroy(): void {
    // if (this.addIngredientSubscription) {
    //   this.addIngredientSubscription.unsubscribe();
    // }
  }

}
