import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService, AlertService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html'
})

export class UpdateModalComponent implements OnInit {
    hide = true;
    error = false;
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<UpdateModalComponent>,
        private userService: UserService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public data: any) 
    { 
        console.log(data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }
    onUpdateClick() {
        this.loading = true;
        this.userService.update(this.data.user)
        .pipe(first())
            .subscribe(
                user => {
                    console.log(user);
                    this.dialogRef.close(this.data);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.error = true;
                });
        
    }
}