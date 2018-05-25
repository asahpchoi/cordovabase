import { Component, OnInit, Input } from '@angular/core';
import { AddRiderComponent } from '../components/add-rider/add-rider.component';
import { PeService } from '../pe.service';
import { NgModel } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-riders',
  templateUrl: './add-riders.component.html',
  styleUrls: ['./add-riders.component.css']
})
export class AddRidersComponent implements OnInit {
  @Input() planCode: string;
  @Input() allowAddRider: boolean;

  
  input = {
    riders: []
  }
  userlist;
  transformedRiders = [];
  validationMsg = [];

  constructor(
    private pe: PeService,
    public dialog: MatDialog,
    private us: UserService
  ) {
    this.userlist = us.getUserList();
    pe.getValidationResult().subscribe(
      vr => {
        if (vr) {
        this.validationMsg = vr.map(e => {
          if (e["parameters"]["%INSURED%"])
            return e["parameters"]["%PRODUCT_ID%"].substring(0, 3) + '|' + e["parameters"]["%INSURED%"]["insuredId"]

        })
        }
      }
    )
  }

  ngOnInit() {
  }

  remove(rider: any): void {    
    let index = this.input.riders.indexOf(rider);

    if (index >= 0) {
      this.input.riders.splice(index, 1);
    }
    this.transformRiders();
    this.pe.updateRiders(this.transformedRiders);
    this.pe.validate();
    this.pe.premiumCalculation();
  }

  addRider(data) {
    let _data = {
      productID: this.planCode,
      riderType: 'ADD',
      userlist: this.userlist,
      riders: [],
      selectedRiders: this.input.riders
    }
    if (data) {
      _data.riderType = data.riderType;
      _data.riders = data.rider;
    }

    let dialogRef = this.dialog.open(AddRiderComponent, {
      width: '640px',
      data: _data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.input.riders.push(result);
      this.transformRiders();
      this.pe.updateRiders(this.transformedRiders);
      console.log('Rider Added')
      this.pe.premiumCalculation();
    });
  }

  transformRiders() {
    this.transformedRiders = [];
    let template = {
      "occupation": "2",
      "otherOptions": {
        "coverageClass": null
      },
      "product": {
        "productKey": {
          "valueDate": "20180314070000",
          "location": "VN",
          "basicProduct": {
            "productPK": {
              "productId": "--"
            }
          },
          "associateProduct": {
            "productPK": {
              "productId": this.planCode
            }
          },
          "primaryProduct": {
            "productPK": {
              "productId": null
            }
          }
        }
      },
      "parties": {
        "party": {
          "insuredAge": null,
          "type": "BASIC",
          "smokingStatus": "NS",
          "insuredSex": null,
          "insuredId": null,
          "birthDate": "19890101070000"
        }
      },
      "faceAmount": null,
      "extraRating": {
        "tempPercentage": 1.00,
        "percentageExtra": 1.00
      },
      "currency": {
        "currencyPK": {
          "currencyId": "VND"
        }
      }
    }

    this.input.riders.forEach(
      rg => {
        rg.riders.forEach(
          r => {
            //debugger
            let skip = false;
            if (rg.riderType == "RHC" && (!r.coverageClass || r.coverageClass == "")) {
              skip = true;
            }
            if (rg.riderType != "RHC" && !r.faceAmount) {
              skip = true;
            }
            if (!skip) {
              let obj = JSON.parse(JSON.stringify(template));
              obj.parties.party.insuredId = rg.insured.id;
              obj.parties.party.insuredAge = rg.insured.insuredAge;
              obj.parties.party.insuredSex = rg.insured.sex;
              obj.otherOptions.coverageClass = r.coverageClass;
              obj.faceAmount = +r.faceAmount;
              obj.product.productKey.primaryProduct.productPK.productId = r.riderID;
              if (rg.riderType == "RHC") {
                obj.faceAmount = null;
                obj.occupation = null;
                delete obj.faceAmount;
                delete obj.occupation;
              }
              if (rg.riderType == "TRI") {
                obj.occupation = null;
                obj.otherOptions = null;

                delete obj.occupation;
                delete obj.otherOptions;
                //obj.
              }
              if (rg.riderType == "ECI") {
                obj.occupation = null;
                obj.otherOptions = null;

                delete obj.occupation;
                delete obj.otherOptions;
                //obj.
              }
              if (rg.riderType == "MC0") {
                obj.occupation = null;
                obj.otherOptions = null;

                delete obj.occupation;
                delete obj.otherOptions;
              }
              this.transformedRiders.push(obj)
            }
          }
        )
      }
    )


  }

}
