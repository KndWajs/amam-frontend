import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListsService } from 'src/app/core/services/shopping-lists.service';
import { ShoppingList } from 'src/app/shared/models/shopping-list';
import { ShoppingElement } from 'src/app/shared/models/shopping-element';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements OnInit, OnDestroy {
  shoppingLists: Array<ShoppingList>;
  addIngredient: string;
  archival: boolean;

  private getShoppingListsSubscription: Subscription;
  private saveShoppingListSubscription: Subscription;
  private deleteShoppingListSubscription: Subscription;
  private updateShoppingListSubscription: Subscription;

  waitingForNewShoppingList: boolean;

  constructor(
    private readonly shoppingListsService: ShoppingListsService,
    private readonly alertService: AlertService
  ) {
    this.waitingForNewShoppingList = false;
    this.archival = false;
  }

  ngOnInit() {
    this.getshoppingLists();
  }


  saveShoppingList(shoppingList: ShoppingList): void {
    this.saveShoppingListSubscription = this.shoppingListsService
      .addShoppingList(shoppingList)
      .subscribe(
        shoppingL => {
          this.getshoppingLists();
          this.alertService.success(`shopping list ${shoppingL.name} was added`, {
            autoClose: true
          });
        },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Save shopping lists'
          );
          this.waitingForNewShoppingList = false;
        }
      );
  }

  getshoppingLists(): void {
    this.waitingForNewShoppingList = true;
    this.getShoppingListsSubscription = this.shoppingListsService
      .getShoppingListsFromHttp(this.archival)
      .subscribe(
        shoppingLists => {
          if (!shoppingLists) {
            this.alertService.warn('User don\'t have any shopping list!', {
              autoClose: true
            });
            this.shoppingLists = new Array();
          } else {
            this.shoppingLists = shoppingLists;
          }
          this.waitingForNewShoppingList = false;
        },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Get shopping lists'
          );
          this.waitingForNewShoppingList = false;
          this.shoppingLists = new Array();
        }
      );

    return;
  }

  deleteShoppingList(shoppingList: ShoppingList): void {
    this.waitingForNewShoppingList = true;
    this.deleteShoppingListSubscription = this.shoppingListsService
      .deleteShoppingList(shoppingList.id)
      .subscribe(
        shoppingL => {
          this.getshoppingLists();
          this.alertService.warn(`shopping list ${shoppingL.name} was deleted`, {
            autoClose: true
          });
        },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Delete shopping list'
          );
          this.waitingForNewShoppingList = false;
        }
      );
  }

  onEditorPreparing(e) {
    if (e.parentType === 'dataRow' && e.dataField === 'ingredient.name') {
      e.editorOptions.disabled = true;
    }
    if (
      e.parentType === 'dataRow' &&
      e.dataField === 'ingredient.ingredientUnit'
    ) {
      e.editorOptions.disabled = true;
    }
  }

  onRowRemoving(shoppingList: ShoppingList, e: any): void {
    const newShoppingList = new ShoppingList(shoppingList);
    const indexRowToRemove = newShoppingList.shoppingElements.map(element => element.id).indexOf(e.data.id);
    newShoppingList.shoppingElements.splice(indexRowToRemove, 1);

    this.updateShoppingList(newShoppingList);
  }

  onRowUpdating(shoppingList: ShoppingList, e: any): void {
    const newShoppingList = new ShoppingList(shoppingList);
    const indexRowToUpdate = newShoppingList.shoppingElements.map(element => element.id).indexOf(e.oldData.id);
    const newShoppingElement = new ShoppingElement(e.oldData);
    if (e.newData.amount != null) {
      newShoppingElement.amount = e.newData.amount;
    } else if (e.newData.alreadyBought != null) {
      newShoppingElement.alreadyBought = e.newData.alreadyBought;
    }
    newShoppingList.shoppingElements[indexRowToUpdate] = newShoppingElement;

    this.updateShoppingList(newShoppingList);
  }

  updateShoppingList(shoppingList: ShoppingList) {
    this.updateShoppingListSubscription = this.shoppingListsService
      .updateShoppingList(shoppingList)
      .subscribe(
        shoppingL => {
          this.alertService.success(`shopping list ${shoppingL.name} was updated`, {
            autoClose: true
          });
        },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Update shopping list'
          );
          this.getshoppingLists();
        }
      );
  }

  addIngredientToShoppingList(
    shoppingElement: ShoppingElement,
    shoppingListIndex: number
  ): void {
    const alreadyExistingIngredientIndex = this.shoppingLists[
      shoppingListIndex
    ].shoppingElements.map(element => element.ingredient.id).indexOf(shoppingElement.ingredient.id);
    if (alreadyExistingIngredientIndex >= 0) {
      const oldShoppingElement = this.shoppingLists[shoppingListIndex]
        .shoppingElements[alreadyExistingIngredientIndex];
      oldShoppingElement.amount =
        oldShoppingElement.amount + shoppingElement.amount;
    } else {
      this.shoppingLists[shoppingListIndex].shoppingElements.push(
        shoppingElement
      );
    }
    this.updateShoppingList(this.shoppingLists[shoppingListIndex]);
  }

  createCombinedShoppingList(
    shoppingList: ShoppingList,
    secondShoppingList: ShoppingList
  ): void {
    this.waitingForNewShoppingList = true;
    let newShoppingList: ShoppingList;
    newShoppingList = new ShoppingList({
      id: null,
      name: shoppingList.name + ' & ' + secondShoppingList.name,
      numberOfPeople:
        shoppingList.numberOfPeople + secondShoppingList.numberOfPeople,
      shoppingElements: this.combineShoppingElements(
        shoppingList.shoppingElements,
        secondShoppingList.shoppingElements
      )
    });

    this.saveShoppingList(newShoppingList);
  }

  combineShoppingElements(
    shoppingElementList: Array<ShoppingElement>,
    secondShoppingElementList: Array<ShoppingElement>
  ): Array<ShoppingElement> {
    let newShoppingElementList: Array<ShoppingElement>;
    newShoppingElementList = Object.assign(
      shoppingElementList,
      newShoppingElementList
    );
    secondShoppingElementList.forEach(
      element =>
        (newShoppingElementList = this.addShoppingElementToList(
          newShoppingElementList,
          element
        ))
    );

    newShoppingElementList.map(element => {
      element.id = null;
    });

    return newShoppingElementList;
  }

  addShoppingElementToList(
    shoppingElementList: Array<ShoppingElement>,
    shoppingElement: ShoppingElement
  ): Array<ShoppingElement> {
    let newShoppingElementList: Array<ShoppingElement>;
    newShoppingElementList = Object.assign(
      shoppingElementList,
      newShoppingElementList
    );
    const alreadyExistingIngredientIndex = shoppingElementList.map(element => element.ingredient.id)
      .indexOf(shoppingElement.ingredient.id);

    if (alreadyExistingIngredientIndex >= 0) {
      const oldShoppingElement =
        shoppingElementList[alreadyExistingIngredientIndex];
      oldShoppingElement.amount =
        oldShoppingElement.amount + shoppingElement.amount;
      oldShoppingElement.alreadyBought =
        oldShoppingElement.alreadyBought && shoppingElement.alreadyBought;
    } else {
      newShoppingElementList.push(shoppingElement);
    }
    return newShoppingElementList;
  }

  changeArchivalFlag(
    shoppingList: ShoppingList,
    e: any
  ): void {
    const newShoppingList = new ShoppingList(shoppingList);
    newShoppingList.archival = e.target.checked;
    this.updateShoppingList(newShoppingList);
  }

  ngOnDestroy(): void {
    if (this.getShoppingListsSubscription) {
      this.getShoppingListsSubscription.unsubscribe();
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
