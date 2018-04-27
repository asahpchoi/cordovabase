import { Component, Inject, OnInit, OnDestroy, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css']
})
export class NumpadComponent implements OnInit {

  first = true;
  constructor(
    public dialogRef: MatDialogRef<NumpadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    

  }

  ngOnInit() {
    if (this.data.number == null || !this.data) {
      this.data = {
        number: ''
      }
    }

  }

  pressKey(i) {
    if(this.first) {
      this.data.number = '';
    }
    this.first = false;
    if (i == 'B') {
      this.data.number = this.data.number.substring(0, this.data.number.length - 1)
      return
    }
    if (i == 'C') {
      this.data.number = 0;
      return
    }
    if (this.data.number == 0)
      this.data.number = "";

    this.data.number += i;
  }

  numberArray() {
    let a: any = _.range(1, 10);

    return a;
  }

  close(isCancel): void {
    if(!isCancel) {
      if(+this.data.hardMin > +this.data.number)
        return;
      this.dialogRef.close(+this.data.number);  
    }
    this.dialogRef.close();
  }

}
