import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogsampleComponent } from './dialogsample/dialogsample.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public dialog: MatDialog) {

  }

  openDialog() {
    console.log(this.dialog)
    this.dialog.open(
      DialogsampleComponent,
      {
        height: '400px',
        width: '600px',
      }).afterClosed()
      .subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });

  }
}
