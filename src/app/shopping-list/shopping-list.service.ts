import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
    //just use the subject instead of evenemiter to communicate across components, through services
    // must use eventemiter when use @Output
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>()
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
    ];
    isBlue = false;

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    onAddedIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredients(ingredients);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}