import { AuthComponent } from './auth/auth.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    //empty path ('') is the path of every route, Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with '', so it always redirect to recipes for every route
    // so we use pathMatch 'full' to only the full path is empty (''), we redirect to recipes component
    { path: '', redirectTo: '/recipes', pathMatch: 'full'}, 
    { path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'auth', component: AuthComponent },
    // { path: 'not-found', component: PageNotFoundComponent },
    // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    // { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
  ];
@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true});
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}