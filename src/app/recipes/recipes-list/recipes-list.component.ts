import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  isBlue = false;
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipeService: RecipeService, private slService: ShoppingListService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
    this.slService.isBlue ? this.isBlue = true : this.isBlue = false;
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }

  toggleColorTextIng() {
    this.slService.isBlue = !this.slService.isBlue;
    this.slService.isBlue ? this.isBlue = true : this.isBlue = false;
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
