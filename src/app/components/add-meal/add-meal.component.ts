import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MealType } from 'src/app/enums/meal-type';
import { PreparingType } from 'src/app/enums/preparing-type';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  readonly mealTypes: Array<Object>;
  readonly preparingTypes: Array<Object>;
  newMealForm: FormGroup;
  meal: Meal;


  constructor(private readonly formBuilder: FormBuilder) {
    this.mealTypes = this.buildMealTypesArray();
    this.preparingTypes = this.buildPreparingTypesArray();

  }

  ngOnInit() {
    // this.meal = new Meal();

    this.newMealForm = this.formBuilder.group({
      name: ['', Validators.required],
      typeOfMeal: ['', Validators.required],
      typeOfPreparing: ['', Validators.required],
      recipe: ['', Validators.required],
      minutesToPrepare: ['', Validators.required],
      ingredients: ['', Validators.required]
    });
  }

  buildMealTypesArray(): Object[] {
    return Object.keys(MealType).map(key => ({ id: MealType[key], name: key }))
  }

  buildPreparingTypesArray(): Object[] {
    return Object.keys(PreparingType).map(key => ({ id: PreparingType[key], name: key }))
  }

  saveNewMeal(newMealForm): void {
    console.log(newMealForm);
  }


  // OnInit, OnDestroy {
  //   readonly bookCategoriesList: Array<string> = this.httpCrudService.getBookCategories();
  //   isbnForm: FormGroup;
  //   isIsbnValid: boolean;
  //   isBookInDb: boolean;
  //   newBookForm: FormGroup;
  //   book: Book;

  //   private bookSubscription: Subscription;
  //   private updateBookSubscription: Subscription;
  //   private addBookSubscription: Subscription;

  //   constructor(
  //     private readonly formBuilder: FormBuilder,
  //     private readonly httpCrudService: HttpCrudService,
  //     private readonly router: Router) { }

  //   ngOnInit(): void {
  //     this.book = new Book();
  //     this.isIsbnValid = false;
  //     this.isBookInDb = false;

  //     this.isbnForm = this.formBuilder.group({
  //       isbn: ['', [Validators.required,
  //       IsbnValidators.hasThirteenDigits,
  //       IsbnValidators.isNumberValid]]
  //     });

  //     this.newBookForm = this.formBuilder.group({
  //       author: ['', Validators.required],
  //       title: ['', Validators.required],
  //       publisher: ['', Validators.required],
  //       publicationDate: ['', Validators.required],
  //       category: ['', Validators.required],
  //       description: [''],
  //       picture: ['', Validators.required],
  //     });
  //   }

  //   ngOnDestroy(): void {
  //     if (this.bookSubscription) {
  //       this.bookSubscription.unsubscribe();
  //     }
  //     if (this.updateBookSubscription) {
  //       this.updateBookSubscription.unsubscribe();
  //     }
  //     if (this.addBookSubscription) {
  //       this.addBookSubscription.unsubscribe();
  //     }
  //   }

  //   addHyphensToIsbn(value: string): void {
  //     let currentValue = value.replace(/\D/g, "");
  //     currentValue = currentValue.slice(0, 13);
  //     currentValue = currentValue.replace(/(\d{3})(\d{1})(\d{2})(\d{6})(\d{1})/, "$1-$2-$3-$4-$5");

  //     this.isbnForm.controls.isbn.setValue(currentValue);
  //   }

  //   updateAuthor(value: string): void {
  //     this.book.author = value;
  //   }

  //   updateTitle(value: string): void {
  //     this.book.title = value;
  //   }

  //   updatePicture(value: string): void {
  //     this.book.picture = value;
  //   }

  //   showNewBookForm(isbn: string): void {
  //     this.isbnForm.controls.isbn.disable();

  //     this.bookSubscription =
  //       this.httpCrudService.getBookByISBN(isbn.split('-').join('')).subscribe(book => {
  //         if (book) {
  //           this.book = book;
  //           this.isBookInDb = true;

  //           this.newBookForm.controls.author.setValue(this.book.author);
  //           this.newBookForm.controls.title.setValue(this.book.title);
  //           this.newBookForm.controls.publisher.setValue(this.book.publisher);
  //           this.newBookForm.controls.publicationDate
  //             .setValue(new Date(this.book.publicationDate).toISOString().substring(0, 10));
  //           this.newBookForm.controls.category.setValue(this.book.category);
  //           this.newBookForm.controls.description.setValue(this.book.description);
  //           this.newBookForm.controls.picture.setValue(this.book.picture);

  //           this.newBookForm.disable();

  //         } else {
  //           this.book.isbn = (isbn.split('-').join(''));
  //         }
  //         this.isIsbnValid = true;
  //       });
  //   }

  //   saveNewBook(newBookForm): void {
  //     this.book.addDate = new Date();

  //     if (this.isBookInDb) {
  //       this.book.numberOfBooks = this.book.numberOfBooks + 1;
  //       this.book.numberOfFreeBooks = this.book.numberOfFreeBooks + 1;

  //       this.updateBookSubscription =
  //         this.httpCrudService.updateBook(this.book).subscribe(() => {
  //           this.router.navigate(['/book/', this.book.isbn, this.book.title, this.book.author]);
  //         });
  //     } else {
  //       this.book.publisher = newBookForm.publisher;
  //       this.book.publicationDate = newBookForm.publicationDate;
  //       this.book.category = newBookForm.category;
  //       this.book.description = newBookForm.description;
  //       this.book.numberOfBooks = 1;
  //       this.book.numberOfFreeBooks = 1;

  //       this.addBookSubscription =
  //         this.httpCrudService.addBook(this.book).subscribe(() => {
  //           this.router.navigate(['/book/', this.book.isbn, this.book.title, this.book.author]);
  //         });
  //     }
  //   }
}
