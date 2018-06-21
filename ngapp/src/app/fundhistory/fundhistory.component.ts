import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'; 

@Component({
  selector: 'app-fundhistory',
  templateUrl: './fundhistory.component.html',
  styleUrls: ['./fundhistory.component.css']
})
export class FundhistoryComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<FundhistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  history;

  getKeys = Object.keys;
  
  ngOnInit() {
    this.history = this.data.history;
    
    console.log(this.data)
  }

}
