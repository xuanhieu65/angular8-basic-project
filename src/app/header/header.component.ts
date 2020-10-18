import { AuthService } from './../auth/auth.service';
import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    private userSub: Subscription;
    isAuthenticated = false;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}