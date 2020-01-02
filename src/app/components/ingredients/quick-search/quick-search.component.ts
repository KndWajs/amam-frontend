import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient';
import { Observable, Subject } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
  private readonly NUMBER_OF_SHOWN_RESULT = 10;
  ingredients$: Observable<Array<Ingredient>>;
  private readonly searchTerms = new Subject<string>();

  @Output() readonly emitableIngredient = new EventEmitter<Ingredient>();

  constructor(private readonly ingredientService: IngredientsService) { }

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

  emitIngredient(ingredient: Ingredient): void {
    this.search('');
    this.emitableIngredient.emit(ingredient);
  }
}
