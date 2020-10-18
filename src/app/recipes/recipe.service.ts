import { Recipe  } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Array<Recipe> = [
    //     new Recipe(
    //         'Tasty Schnitzel1', 
    //         'This is simply a test', 
    //         'https://www.skinnytaste.com/wp-content/uploads/2009/02/turkey-meatloaf-8.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20),
    //         ]
    //         ),
    //     new Recipe(
    //         'Tasty Schnitzel2', 
    //         'This is simply a test2', 
    //         'https://www.skinnytaste.com/wp-content/uploads/2009/02/turkey-meatloaf-8.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1),
    //         ]
    //         )
    // ];
    private recipes: Recipe[] = [];
    
    constructor(private slService: ShoppingListService) {

    }

    //lay recipes tu server va ghi de vao mang recipes ban dau
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    // addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //     this.slService.addIngredients(ingredients);
    // }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}