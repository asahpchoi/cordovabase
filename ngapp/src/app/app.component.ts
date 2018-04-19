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


  openDialog(mode) {
    if(mode) {
            document.getElementById("dummy").focus();
            this.dialog.closeAll();

    }

    window.setTimeout(
          (dialog) => {
            dialog.open(
              DialogsampleComponent
            ).afterClosed().subscribe(result => {
              //tidy up bug fix
              console.log(result, mode)
            });
          }, 300, this.dialog, true);


}
}
