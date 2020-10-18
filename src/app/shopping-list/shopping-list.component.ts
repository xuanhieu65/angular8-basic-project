import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  isBlue = false;
  private ingChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangeSub = this.shoppingListService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    });
    this.shoppingListService.isBlue ? this.isBlue = true : this.isBlue = false;
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingChangeSub.unsubscribe();
  }

}
