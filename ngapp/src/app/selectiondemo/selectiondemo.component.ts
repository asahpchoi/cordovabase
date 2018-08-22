import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SelectionComponent } from '../selection/selection.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selectiondemo',
  templateUrl: './selectiondemo.component.html',
  styleUrls: ['./selectiondemo.component.css']
})
export class SelectiondemoComponent {
  input = {
    limit: 1,
    value: [],
    list: 'country',
    suggestions: ["HK", "VN", "PH"]
  }
  items;
  selections = {
    single: [],
    multiple: [],
    hierarchy: [],
    occupation: []
  }


  constructor(public ds: DataService, public dialog: MatDialog) {
    ds.loadData('country').then(
      x => {
 
      }
    )

    ds.loadData('occupation');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectionComponent, {
      width: '50vw',
      height: '100vh',
      autoFocus: true,
      position: {
        left: "50vw",
        top: "0"
      },
      data: {
        input: this.input
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


  remove(
    i, items
  ) {
    const index = items.indexOf(i);
    if (index >= 0) {
      items.splice(index, 1);
    }
  }


  showName(code, type?) {
    return this.ds.getValue(code, type?type:'country');
  }


}
