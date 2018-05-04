import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PeService } from '../pe.service';
import { NgModel } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NumpadComponent } from '../components/numpad/numpad.component';
import { HttpClient } from '@angular/common/http';
import * as ts from "typescript";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  input = {
    duration: 15,
    insuredAge: 29,
    insuredSex: 'M',
    faceAmount: 0,
    plannedPremium: 0,
    regularPayment: 0,
    termfaceAmount: 0,
    termplannedPremium: 0,
    paymentMode: 'Annual',
    riderPremium: 0
  }

  ranges = {
    faceAmount: {
      hardMin: 100000,
      min: null,
      max: null
    },
    plannedPremium: {
      hardMin: 7000,
      min: null,
      max: null,
      hardMax: null
    },
    regularPayment: {
      hardMin: 0,
      min: 0,
      max: null
    },
    termfaceAmount: {
      hardMin: 0,
      min: 0,
      max: null
    }
  }

  testcases;
  selectedTestcase;
  formControls = {
    duration: new FormControl('duration', [Validators.min(4), Validators.max(99), Validators.required]),
    riderPremium: new FormControl('riderPremium'),
    termPremium: new FormControl('termPremium')
  }


  constructor(
    private pe: PeService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    http.get('./assets/payloads.json').first().subscribe(
      json => {
        let data: any = json;

        this.testcases = [
          {
            name: 'UL007',
            payload: data.UL007,
            productType: 'UL',
            termRiderId: 'TRI07',
            readOnlyFields: ["termPremium", "riderPremium"]
          }
          ,
          {
            name: 'ENC12',
            payload: data.ENC12,
            productType: 'CI',
            termRiderId: 'TRI08',
            filters: {
              insuredAge: {
                min: 0,
                max: 17
              }
            },
            duration: 12,
            readOnlyFields: ["duration", "termPremium", "riderPremium"]
          },
          {
            name: 'ENC15',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 0,
                max: 17
              }
            }
            ,
            duration: 15,
            readOnlyFields: ["duration", "termPremium", "riderPremium"]
          },
          {
            name: 'ENC20',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 0,
                max: 17
              }
            }
            ,
            duration: 20,
            readOnlyFields: ["duration", "termPremium", "riderPremium"],
            disableAddRiders: true
          },
          {
            name: 'ENF12',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 18,
                max: 99
              },
              insuredSex: 'F'
            }
            ,
            duration: 12,
            readOnlyFields: ["duration", "termPremium", "riderPremium"]
          },
          {
            name: 'ENF15',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 18,
                max: 99
              },
              insuredSex: 'F'
            }
            ,
            duration: 15,
            readOnlyFields: ["duration", "termPremium", "riderPremium"]
          },
          {
            name: 'ENF20',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 18,
                max: 99
              },
              insuredSex: 'F'
            }
            ,
            duration: 20,
            readOnlyFields: ["duration", "termPremium", "riderPremium"],
            disableAddRiders: true
          },
          {
            name: 'ENM12',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 18,
                max: 99
              },
              insuredSex: 'M'
            }
            ,
            duration: 12,
            readOnlyFields: ["duration", "termPremium", "riderPremium"]
          },
          {
            name: 'ENM15',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 18,
                max: 99
              },
              insuredSex: 'M'
            }
            ,
            duration: 15,
            readOnlyFields: ["duration", "termPremium", "riderPremium"]
          },
          {
            name: 'ENM20',
            payload: data.ENC12,
            productType: 'CI',
            filters: {
              insuredAge: {
                min: 18,
                max: 99
              },
              insuredSex: 'M'
            }
            ,
            duration: 20,
            readOnlyFields: ["duration", "termPremium", "riderPremium"],
            disableAddRiders: true
          },
          {
            name: 'ADD03',
            payload: data.ADD03,
            productType: 'UVL'
          }
        ];
      }

    )

    pe.premiumSubject.subscribe(
      d => {
        if (d) {

          let data: any = d;
          console.log(d)
          //this.input.plannedPremium = data.premiums.premiums.filter(p => p.paymentMode == this.paymentMode)[0].premium
          this.input.termplannedPremium = 0;
          data.riders.filter(r => r.riderCode == this.selectedTestcase.termRiderId).forEach(
            r => {
              this.input.termplannedPremium += r.premiums.premiums.filter(p => p.paymentMode == this.input.paymentMode)[0].premium;
            }
          )

          this.input.riderPremium = 0;
          data.riders.filter(r => r.riderCode != this.selectedTestcase.termRiderId).forEach(
            r => {
              this.input.riderPremium += r.premiums.premiums.filter(p => p.paymentMode == this.input.paymentMode)[0].premium;
            }
          )
          this.updateRegularPaymentRange();
        }
      }
    )

  }
  ngOnDestroy() {
    //
  }

  filterTestCases() {
    if (!this.testcases) return;
    return this.testcases.filter(t => {
      if (t.filters) {
        return (
          t.filters.insuredAge.min <= this.input.insuredAge &&
          t.filters.insuredAge.max >= this.input.insuredAge &&
          (t.filters.insuredSex == this.input.insuredSex || t.filters.insuredSex == null)
        )
      }
      return true;
    })
  }

  selectBasePlan() {
    this.formControls['duration'].enable();
    if (this.selectedTestcase && this.selectedTestcase.readOnlyFields) {
      this.selectedTestcase.readOnlyFields.forEach(
        f => { this.formControls[f].disable(); }
      )
    }
    this.setPremiumDuration();
  }

  private setPremiumDurationCI() {
    this.input.duration = this.selectedTestcase.duration;
    this.formControls.duration.disable();

  }

  private setPremiumDuration() {
    if(!this.selectedTestcase) return
    switch (this.selectedTestcase.productType) {
      case 'CI': this.setPremiumDurationCI(); break;
      default:
        let planID = this.selectedTestcase.name;
        let ranges: any = this.pe.getDurationRange(planID, this.input.insuredAge);

        this.input.duration = ranges.max;

        this.formControls.duration.setValidators(
          [
            Validators.required,
            Validators.min(+ranges.min),
            Validators.max(+ranges.max)
          ]
        );
    }
  }

  ngOnInit() {
  }

  //UI Functions 
  updatePaymentMode() {
    switch (this.input.paymentMode) {
      case 'Annual': this.ranges.plannedPremium.hardMin = 7000; break;
      case 'Semi-Annual': this.ranges.plannedPremium.hardMin = 7000 / 2; break;
      case 'Quarterly': this.ranges.plannedPremium.hardMin = 7000 / 4; break;
      case 'Monthly': this.ranges.plannedPremium.hardMin = 7000 / 12; break;
    }
    this.updateTermFaceAmount();
    this.updateBaseProtection();
    this.updateBasePremium();
  }
  calculate() {
    this.updatePayload();
    if (this.selectedTestcase.payload) {
      this.pe.calculate(this.selectedTestcase.payload, this.selectedTestcase.productType);
    }
  }
  validate() {
    this.updatePayload();
    if (this.selectedTestcase.payload) {
      this.pe.validate(this.selectedTestcase.payload);
    }
  }
  changeValue(field) {
    let r = this.ranges[field]
    let dialogRef = this.dialog.open(NumpadComponent, {
      width: '250px',
      data: {
        number: this.input[field] + '',
        min: r.min,
        max: r.max,
        hardMin: r.hardMin,
        year: 1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //debugger
      if (result.number) {
        this.input[field] = result.number;
        switch (field) {
          case 'faceAmount': this.updateBaseProtection(); break;
          case 'termfaceAmount': this.updateTermFaceAmount(); break;
          case 'plannedPremium': this.updateBasePremium(); break;
        }
      }
    });
  }



  //logic functions
  private updateTermFaceAmount() {
    if (this.input.termfaceAmount == 0) {
      this.input.termplannedPremium = 0;
      this.updateRegularPaymentRange();
      return;
    }
    this.updatePayload();
    this.pe.premiumCalculation(this.selectedTestcase.payload);
  }
  private updateBasePremium() {
    this.pe.calculateFaceAmountRange(this.input.plannedPremium, this.input.insuredAge, this.input.paymentMode, this.selectedTestcase.name).
      subscribe(x => {
        let data: any = x;

        this.ranges.faceAmount.min = Math.max(1000000, Math.round(data.value.minLimit));
        this.ranges.faceAmount.max = Math.round(data.value.maxLimit);
        //this.faceAmountCtrl.setValidators([Validators.min(data.value.minLimit), Validators.max(data.value.maxLimit), Validators.required]);
      })
    this.updateRegularPaymentRange();
  }
  private updateBaseProtection() {

    this.pe.calculatePlannedPremiumRange(this.input.faceAmount, this.input.insuredAge, this.input.paymentMode, this.selectedTestcase.name).
      subscribe(x => {
        //Not work for non UL007
        console.log(x)
        let data: any = x;
        this.updateTermProtectionRange();

        this.ranges.plannedPremium.min = Math.round(data.value.minLimit);
        this.ranges.plannedPremium.max = Math.round(data.value.maxLimit);
        if (this.input.plannedPremium == 0) {
          this.input.plannedPremium = Math.round(data.value.defPremium);
          this.updateRegularPaymentRange();
          this.updateBasePremium();
        }
        //this.plannedPremiumCtrl.setValidators([Validators.min(this.ranges.plannedPremium.min), Validators.max(this.ranges.plannedPremium.max), Validators.required]);
      })

  }
  private updateTermProtectionRange(): void {
    this.pe.calculateTermRiderFaceAmount(
      this.input.insuredAge,
      this.input.faceAmount,      
      this.selectedTestcase.termRiderId,
      this.selectedTestcase.name
    ).subscribe(
      range => {
        this.ranges['termfaceAmount'].min = range.value.minLimit;
        this.ranges['termfaceAmount'].max = range.value.maxLimit;
      }
    )
  }
  private updateRegularPaymentRange() {
    let min = +this.input.plannedPremium + +this.input.termplannedPremium + this.input.riderPremium;
    if (this.input.regularPayment < min) this.input.regularPayment = min;
    this.ranges['regularPayment'].min = min;
    this.ranges['regularPayment'].hardMin = min;
  }
  private updatePayload() {
    if (!this.selectedTestcase) return;
    let payload = this.selectedTestcase.payload;

    payload.coverageInfo.parties.party.insuredAge = +this.input.insuredAge;
    payload.coverageInfo.parties.party.insuredSex = this.input.insuredSex;
    payload.coverageInfo.plannedPremium = +this.input.plannedPremium;
    payload.coverageInfo.faceAmount = +this.input.faceAmount;
    if (!this.input.termfaceAmount || this.input.termfaceAmount == 0) {
      payload.riders = {
        "coverageInfo": []
      };
    }
    else { // no rider if
      //add default term rider for owner.
      payload.riders = {
        "coverageInfo": [{
          "product": {
            "productKey": {
              "valueDate": "20180313070000",
              "location": "VN",
              "basicProduct": {
                "productPK": {
                  "productId": "--"
                }
              },
              "associateProduct": {
                "productPK": {
                  "productId":  this.selectedTestcase.name
                }
              },
              "primaryProduct": {
                "productPK": {
                  "productId": this.selectedTestcase.termRiderId
                }
              }
            }
          },
          "parties": {
            "party": {
              "type": "BASIC",
              "smokingStatus": "NS",
              "insuredSex": "M",
              "insuredId": "PROJ, STOP PAYMENT AT Y11",
              "insuredAge": this.input.insuredAge,
              "birthDate": "19890101070000"
            }
          },
          "faceAmount": +this.input.termfaceAmount,
          "extraRating": {
            "tempPercentage": 1.00,
            "percentageExtra": 1.00
          },
          "currency": {
            "currencyPK": {
              "currencyId": "VND"
            }
          }
        }]
      };
    }

    payload.coverageInfo.options.paymentMode = this.input.paymentMode.substring(0, 1);

    switch (payload.coverageInfo.product.productKey.primaryProduct.productPK.productId) {
      case "UL007":
        payload.fundActivities.fundActivity = [
          {
            "regularPayment": +this.input.regularPayment,
            "attainAge": +this.input.insuredAge
          },
          {
            "regularPayment": 0.00,
            "attainAge": "" + (+this.input.insuredAge + +this.input.duration)
          }
        ];
        break;
      case "ENC12": payload.fundActivities.fundActivity = []; break;
    }
  }

}
