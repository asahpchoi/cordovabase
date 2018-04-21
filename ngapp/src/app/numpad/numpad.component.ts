import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css']
})
export class NumpadComponent {

  constructor(
    public dialogRef: MatDialogRef<NumpadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  pressKey(i) {
    if(i=='B') {
      this.data.number = this.data.number.substring(0, this.data.number.length - 1)
      return
    }
    if(i=='C') {
      this.data.number=0;
      return
    }
    if(this.data.number == 0)
      this.data.number = "";

    this.data.number +=  i;
  }

  numberArray() {
    let a:any = _.range(1, 10);

    return a;
  }
  onNoClick(): void {

    this.dialogRef.close();
  }

}
