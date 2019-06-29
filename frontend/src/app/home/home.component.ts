import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { UpdateModalComponent } from '../update-modal';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        public dialog: MatDialog
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        console.log('homecomponent constructor');
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }
    editUser(user: User) {
        const dialogRef = this.dialog.open(UpdateModalComponent, {
            width: '260px',
            data: user
          });
      
          dialogRef.afterClosed().subscribe(res => {
              if (!res) {
                  this.userService.getById(user.id).subscribe(response => { user = response; console.log(user)});
              }
            console.log(res);
          });
    }
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}