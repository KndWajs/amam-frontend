import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListsService } from 'src/app/services/shopping-lists.service';
import { ShoppingListProposalElement } from 'src/app/models/shopping-list-proposal-element';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingElement } from 'src/app/models/shopping-element';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements OnInit {
  shoppingListProposals: Array<Array<ShoppingListProposalElement>>;
  shoppingLists: Array<ShoppingList>;

  addIngredient: String;

  private getShoppingListsSubscription: Subscription;
  private getShoppingListProposalsSubscription: Subscription;
  private saveShoppingListSubscription: Subscription;
  private deleteShoppingListSubscription: Subscription;
  private updateShoppingListSubscription: Subscription;


  waitingForNewShoppingList: boolean;

  constructor(private readonly shoppingListsService: ShoppingListsService) {
    this.waitingForNewShoppingList = false;
  }

  ngOnInit() {
    this.getShoppingListsProposals();
    this.getshoppingLists();
  }

  createShoppingList(shoppingListProposalElement: Array<ShoppingListProposalElement>): void {
    this.waitingForNewShoppingList = true;
    let newShoppingList: ShoppingList;
    newShoppingList = new ShoppingList({
      id: null,
      name: shoppingListProposalElement[0].menu.name,
      numberOfPeople: shoppingListProposalElement[0].menu.numberOfPeople,
      shoppingElements: this.createShoppingElementListFromProposal(shoppingListProposalElement)
    })
    this.saveShoppingList(newShoppingList);
  }

  saveShoppingList(shoppingList: ShoppingList): void {
    this.saveShoppingListSubscription =
      this.shoppingListsService.addShoppingList(shoppingList).subscribe((newShoppingList) => {
        this.getshoppingLists();
      },
        error => {
          console.log(error);
          this.waitingForNewShoppingList = false;
        });
  }

  createShoppingElementListFromProposal(shoppingListProposalElements: Array<ShoppingListProposalElement>): Array<ShoppingElement> {
    let newShoppingElementList: Array<ShoppingElement> = new Array();
    shoppingListProposalElements.forEach(element => {
      let newShoppingElement: ShoppingElement = new ShoppingElement({
        id: null,
        ingredient: element.ingredient,
        amount: element.amount,
        alreadyBought: false
      });
      newShoppingElementList.push(newShoppingElement as ShoppingElement);
    });

    return newShoppingElementList;
  }

  getshoppingLists(): void {
    this.waitingForNewShoppingList = true;
    this.getShoppingListsSubscription = this.shoppingListsService.getShoppingListsFromHttp().subscribe
      (shoppingLists => {
        this.shoppingLists = shoppingLists;
        this.waitingForNewShoppingList = false;
      },
        error => {
          console.log('there is no shoppingLists');
          console.log(error);
          this.waitingForNewShoppingList = false;
        });

    return;
  }

  deleteShoppingList(shoppingList: ShoppingList): void {
    this.waitingForNewShoppingList = true;
    this.deleteShoppingListSubscription = this.shoppingListsService.deleteShoppingList(shoppingList.id).subscribe(
      (shoppingList) => {
        this.getshoppingLists();
      },
      error => {
        this.waitingForNewShoppingList = false;
        console.log(error);
      });
  }


  getShoppingListsProposals(): void {
    this.getShoppingListProposalsSubscription = this.shoppingListsService.getAllShoppingListsProposals().subscribe
      (shoppingListProposals => {
        this.shoppingListProposals = shoppingListProposals;
        // if (!book) {
        //   this.errorMessage = `book with isbn: ${isbn} does not exist`;
        // } else {
        //   this.book = book;
        // }
      },
        error => {
          console.log('there is no shoppingListsProposals');
        });

  }

  onEditorPreparing(e) {
    if (e.parentType === "dataRow" && e.dataField === "ingredient.name") {
      e.editorOptions.disabled = true;
    }
    if (e.parentType === "dataRow" && e.dataField === "ingredient.ingredientUnit") {
      e.editorOptions.disabled = true;
    }
  }

  onRowRemoving(shoppingList: ShoppingList, e: any): void {
    let newShoppingList = new ShoppingList(shoppingList);
    const indexRowToRemove = newShoppingList.shoppingElements.map(function (e) { return e.id; }).indexOf(e.data.id);
    newShoppingList.shoppingElements.splice(indexRowToRemove, 1)

    this.updateShoppingList(newShoppingList);
  }

  onRowUpdating(shoppingList: ShoppingList, e: any): void {
    let newShoppingList = new ShoppingList(shoppingList);
    const indexRowToUpdate = newShoppingList.shoppingElements.map(function (e) { return e.id; }).indexOf(e.oldData.id);
    let newShoppingElement = new ShoppingElement(e.oldData);
    if (e.newData.amount != null) {
      newShoppingElement.amount = e.newData.amount;
    } else if (e.newData.alreadyBought != null) {
      newShoppingElement.alreadyBought = e.newData.alreadyBought;
    }
    newShoppingList.shoppingElements[indexRowToUpdate] = newShoppingElement;

    this.updateShoppingList(newShoppingList);
  }

  updateShoppingList(shoppingList: ShoppingList) {
    this.updateShoppingListSubscription = this.shoppingListsService.updateShoppingList(shoppingList).subscribe
      (shoppingListProposals => {
      },
        error => {
          console.log('updating problems...');
          this.getshoppingLists();
        });
  }

  addIngredientToShoppingList(shoppingElement: ShoppingElement, shoppingListIndex: number): void {

    const alreadyExistingIngredientIndex = this.shoppingLists[shoppingListIndex].shoppingElements.map(function (e) { return e.ingredient.id; }).indexOf(shoppingElement.ingredient.id);
    if (alreadyExistingIngredientIndex >= 0) {
      let oldShoppingElement = this.shoppingLists[shoppingListIndex].shoppingElements[alreadyExistingIngredientIndex];
      oldShoppingElement.amount = oldShoppingElement.amount + shoppingElement.amount;
    } else {
      this.shoppingLists[shoppingListIndex].shoppingElements.push(shoppingElement);
    }
    this.updateShoppingList(this.shoppingLists[shoppingListIndex]);
  }

  createCombinedShoppingList(shoppingList: ShoppingList, secondShoppingList: ShoppingList): void {
    this.waitingForNewShoppingList = true;
    let newShoppingList: ShoppingList;
    newShoppingList = new ShoppingList({
      id: null,
      name: shoppingList.name + " & " + secondShoppingList.name,
      numberOfPeople: shoppingList.numberOfPeople + secondShoppingList.numberOfPeople,
      shoppingElements: this.combineShoppingElements(shoppingList.shoppingElements, secondShoppingList.shoppingElements)
    })

    this.saveShoppingList(newShoppingList);
  }

  combineShoppingElements(shoppingElementList: Array<ShoppingElement>, secondShoppingElementList: Array<ShoppingElement>): Array<ShoppingElement> {
    let newShoppingElementList: Array<ShoppingElement>;
    newShoppingElementList = Object.assign(shoppingElementList, newShoppingElementList);
    secondShoppingElementList.forEach(element => newShoppingElementList = this.addShoppingElementToList(newShoppingElementList, element));

    newShoppingElementList.map(element => {element.id = null;})

    return newShoppingElementList;
  }

  addShoppingElementToList(shoppingElementList: Array<ShoppingElement>, shoppingElement: ShoppingElement): Array<ShoppingElement> {
    let newShoppingElementList: Array<ShoppingElement>;
    newShoppingElementList = Object.assign(shoppingElementList, newShoppingElementList);
    const alreadyExistingIngredientIndex = shoppingElementList.map(function (e) { return e.ingredient.id; }).indexOf(shoppingElement.ingredient.id);

    if (alreadyExistingIngredientIndex >= 0) {
      let oldShoppingElement = shoppingElementList[alreadyExistingIngredientIndex];
      oldShoppingElement.amount = oldShoppingElement.amount + shoppingElement.amount;
      oldShoppingElement.alreadyBought = oldShoppingElement.alreadyBought && shoppingElement.alreadyBought;
    } else {
      newShoppingElementList.push(shoppingElement);
    }
    return newShoppingElementList;
  }

  ngOnDestroy(): void {
    if (this.getShoppingListsSubscription) {
      this.getShoppingListsSubscription.unsubscribe();
    }
    if (this.getShoppingListProposalsSubscription) {
      this.getShoppingListProposalsSubscription.unsubscribe();
    }
    if (this.saveShoppingListSubscription) {
      this.saveShoppingListSubscription.unsubscribe();
    }
    if (this.deleteShoppingListSubscription) {
      this.deleteShoppingListSubscription.unsubscribe();
    }
    if (this.updateShoppingListSubscription) {
      this.updateShoppingListSubscription.unsubscribe();
    }
  }

}
