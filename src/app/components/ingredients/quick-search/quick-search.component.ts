import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient';
import { Observable, Subject, Subscription } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { IngredientUnit } from 'src/app/enums/ingredient-unit';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
  readonly ingredientUnits: Array<Object>;
  newIngredientForm: FormGroup;
  private addIngredientSubscription: Subscription;
  ingredient: Ingredient;
  addIngredientMessage: string;

  private readonly NUMBER_OF_SHOWN_RESULT = 10;
  ingredients$: Observable<Array<Ingredient>>;
  private readonly searchTerms = new Subject<string>();

  @Output() readonly emitableIngredient = new EventEmitter<Ingredient>();

  constructor(private readonly ingredientService: IngredientsService, private readonly formBuilder: FormBuilder) {
    this.ingredientUnits = this.buildIngredientUnits();
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

    this.newIngredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      ingredientUnit: ['', Validators.required]
    });
  }

  emitIngredient(ingredient: Ingredient): void {
    this.search('');
    this.emitableIngredient.emit(ingredient);
  }

  buildIngredientUnits(): Object[] {
    return Object.keys(IngredientUnit).map(key => ({ id: IngredientUnit[key], name: key }))
  }

  keyDown(event: any) {
    let element = event.srcElement.nextElementSibling;

    if (element == null)
      return;
    else
      element.focus();
  }

  saveNewIngredient(newIngredientForm): void {
    this.ingredient = new Ingredient(newIngredientForm);
    this.addIngredientSubscription =
      this.ingredientService.addIngredient(this.ingredient).subscribe((ingredient) => {
        console.log("ingredient added succesfully");
        console.log(ingredient);
        this.addIngredientMessage = "Success!"
      },
        error => {
          let errorDetails = '';
          if (typeof error.error === 'string' || error.error instanceof String) {
            errorDetails = ' --- ' + error.error;
          }
          this.addIngredientMessage = (`${error.message} ${errorDetails}`);
          console.log(error);
        });
  }

  ngOnDestroy(): void {
    if (this.addIngredientSubscription) {
      this.addIngredientSubscription.unsubscribe();
    }
  }
}
