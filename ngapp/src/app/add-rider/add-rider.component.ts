import { Component, Inject, OnInit, OnDestroy, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-rider',
  templateUrl: './add-rider.component.html',
  styleUrls: ['./add-rider.component.css']
})
export class AddRiderComponent implements OnInit {
  riders = {
    "UL007": {
      "ADD": { riderId: ["ADD03"], fields: { faceAmount: 0 } },
      "ECI": { riderId: ["ECI01"], fields: { faceAmount: 0 } },
      "RHC": { riderId: ["RHC2I", "RHC2O", "RHC2D"], fields: { coverageClass: "A" } },
      "MC": { riderId: ["MC005"], fields: { faceAmount: 0 } },
      "TR": { riderId: ["TRI07"], fields: { faceAmount: 0 } }
    }
  }

  input = {
    insured: '',
    riders: []
  }

  changeRiderType() {
    this.mapRider();
  }

  getRiderTypes() {
    return Object.keys(this.riders[this.data.productID]);
  }

  mapRider() {
    let ridercodes: any = this.riders[this.data.productID][this.data.riderType];

    this.input.riders = ridercodes.riderId.map(
      rc => {
        let inputObj = Object.assign({});
        inputObj.riderID = rc;
        inputObj = { ...inputObj, ...ridercodes.fields }
        return inputObj;
      }
    )
  }

  constructor(
    public dialogRef: MatDialogRef<AddRiderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.mapRider()
  }

  ngOnDestroy() {

  }

}
