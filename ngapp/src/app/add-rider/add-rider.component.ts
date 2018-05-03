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
      "RHC": { riderId: ["RHC2I", "RHC2O", "RHC2D"], fields: { coverageClass: "" } },
      "MC0": { riderId: ["MC005"], fields: { faceAmount: 0 } },
      "TRI": { riderId: ["TRI07"], fields: { faceAmount: 0 } }
    }
  }
  getKeys = Object.keys;
  userlist;

  private updateUserList() {
    if (!this.data.userlist) return;

    let insuredId = this.data.userlist.insured.id;

    let selectedUsers: any = this.data.selectedRiders
      .filter(
        r => r.riderType == this.input.riderType
      ).map(sr => sr.insured.id);

    if (this.input.riderType == 'TRI') {
      selectedUsers.push(insuredId);
    }

    //debugger

    let fulluserlist = [...[this.data.userlist.owner],
    ...[this.data.userlist.insured],
    ...this.data.userlist.dependents]

    this.userlist = fulluserlist.filter(
      sr => !selectedUsers.includes(sr.id)
    );
  }

  labels = {
    "": "N/A",
    "A": "Basic",
    "B": "Advance",
    "C": "Premier",
    "D": "Elite",
    "RHC2I": "Inpatient",
    "RHC2O": "Outpatient",
    "RHC2D": "Dental",
    "ADD03": "ADD Rider",
    "TRI07": "Term Rider",
    "ECI01": "ECI Rider",
    "MC005": "MC Rider"

  }


  input = {
    insured: {
      insuredAge: 0
    },
    riderType: "",
    riders: []
  }

  updateOptions(r) {
    if (r == "RHC2I") {
      this.getInputRider("RHC2O").coverageClass = "";
      this.getInputRider("RHC2D").coverageClass = "";
    }
  }

  loadRiderOptions(r) {
    let options = [];
    switch (r) {
      case "RHC2I": {
        return this.input.insured.insuredAge >= 18 ? ["A", "B", "C", "D"] : ["A", "B", "C"];
      }
      default: {
        let baseClass = this.getInputRider("RHC2I").coverageClass;
        switch (baseClass) {
          case "A": return [""];
          case "B": return ["", "B"];
          case "C": return ["", "B", "C"];
          case "D": return ["", "B", "C", "D"];
        }
      }
    }
  }

  getInputRider(r) {
    //debugger
    return this.input.riders.filter
      (
      x => x.riderID == r
      )[0];
  }

  changeRiderType() {
    this.mapRider();
    this.updateUserList();
  }

  getRiderTypes() {
    this.input.riderType = this.data.riderType;
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
    if (this.data.riders) this.input.riders = this.data.riders;
    this.input.riderType = this.data.riderType;
    this.mapRider();
    this.updateUserList();
  }

  close(isCancel): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {

  }

}
