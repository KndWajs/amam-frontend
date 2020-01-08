import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListsService } from 'src/app/services/shopping-lists.service';
import { ShoppingElement } from 'src/app/models/shopping-element';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements OnInit {
  shoppingLists: Array<Array<ShoppingElement>>;

  private getShoppingListsSubscription: Subscription;

  constructor(private readonly shoppingListsService: ShoppingListsService) {

  }

  ngOnInit() {
      this.getshoppingLists();
  }


  getshoppingLists(): void {
    this.getShoppingListsSubscription = this.shoppingListsService.getShoppingListForAllMenus().subscribe
      (shoppingLists => {
        this.shoppingLists = shoppingLists;
        console.log(this.shoppingLists);
        // if (!book) {
        //   this.errorMessage = `book with isbn: ${isbn} does not exist`;
        // } else {
        //   this.book = book;
        // }
      },
        error => {
          console.log('there is no shoppingLists');
        });

    return;
  }

  ngOnDestroy(): void {
    if (this.getShoppingListsSubscription) {
        this.getShoppingListsSubscription.unsubscribe();
    }
}

}
