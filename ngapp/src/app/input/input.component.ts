import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PeService } from '../pe.service';
import { NgModel } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NumpadComponent } from '../numpad/numpad.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  input = {
    duration: 15,
    insuredAge: 29,
    faceAmount: 0,
    plannedPremium: 0,
    regularPayment: 0,
    termfaceAmount: 0,
    termplannedPremium: 0,
    paymentMode: 'Annual'
  }

  ranges = {
    faceAmount: {
      hardMin: 1000000,
      min: 1000000,
      max: null
    },
    plannedPremium: {
      hardMin: 7000,
      min: 7000,
      max: null
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
    duration: new FormControl('duration', [Validators.min(4), Validators.max(99), Validators.required])
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
            productType: 'UL'
          }
          ,
          {
            name: 'ENC12',
            payload: data.ENC12,
            productType: 'CI'
          },

          {
            name: 'ADD03',
            payload: data.ADD03,
            productType: 'UVL'
          }
        ];
      }

    )

  }
  ngOnDestroy() {
    //this.pe.
  }

  selectBasePlan() {
    this.setPremiumDuration();
     
  }
  

  private setPremiumDuration() {
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
        hardMin: r.hardMin
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //debugger
      if (result) {
        this.input[field] = result;
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
    this.pe.premiumCalculation(this.selectedTestcase.payload).subscribe(
      d => {
        let data: any = d;
        //this.input.plannedPremium = data.premiums.premiums.filter(p => p.paymentMode == this.paymentMode)[0].premium
        this.input.termplannedPremium = data.riders["0"].premiums.premiums.filter(p => p.paymentMode == this.input.paymentMode)[0].premium
        this.updateRegularPaymentRange();
      }
    )
  }
  private updateBasePremium() {
    this.pe.calculateFaceAmountRange007(this.input.plannedPremium, this.input.insuredAge, this.input.paymentMode).
      subscribe(x => {
        let data: any = x;

        this.ranges.faceAmount.min = Math.max(1000000, Math.round(data.value.minLimit));
        this.ranges.faceAmount.max = Math.round(data.value.maxLimit);
        //this.faceAmountCtrl.setValidators([Validators.min(data.value.minLimit), Validators.max(data.value.maxLimit), Validators.required]);
      })
    this.updateRegularPaymentRange();

  }
  private updateBaseProtection() {
    if (this.input.plannedPremium == 0) {
      this.pe.calculatePlannedPremiumRange007(this.input.faceAmount, this.input.insuredAge, this.input.paymentMode).
        subscribe(x => {
          let data: any = x;
          this.ranges.plannedPremium.min = Math.round(data.value.minLimit);
          this.ranges.plannedPremium.max = Math.round(data.value.maxLimit);
          this.input.plannedPremium = Math.round(data.value.defPremium);
          this.updateRegularPaymentRange();
          this.updateBasePremium();
          this.updateRiderProtectionRange();
          //this.plannedPremiumCtrl.setValidators([Validators.min(this.ranges.plannedPremium.min), Validators.max(this.ranges.plannedPremium.max), Validators.required]);
        })
    }
  }
  private updateRiderProtectionRange() {
    let range = this.pe.calculateRiderFaceAmountRange(
      null, null,
      this.input.faceAmount
      , null, null
    );

    this.ranges['termfaceAmount'].min = range.min;
    this.ranges['termfaceAmount'].max = range.max;
  }
  private updateRegularPaymentRange() {
    this.input.regularPayment = +this.input.plannedPremium + +this.input.termplannedPremium;
    this.ranges['regularPayment'].min = this.input.regularPayment;
    this.ranges['regularPayment'].hardMin = this.input.regularPayment;
  }
  private updatePayload() {
    if (!this.selectedTestcase) return;
    let payload = this.selectedTestcase.payload;

    payload.coverageInfo.parties.party.insuredAge = this.input.insuredAge;
    payload.coverageInfo.plannedPremium = this.input.plannedPremium;
    payload.coverageInfo.faceAmount = this.input.faceAmount;
    if (!this.input.termfaceAmount || this.input.termfaceAmount == 0) {
      payload.riders = {
        "coverageInfo": []
      };
    }
    else { // no rider if
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
                  "productId": "UL007"
                }
              },
              "primaryProduct": {
                "productPK": {
                  "productId": "TRI07"
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
          "faceAmount": this.input.termfaceAmount,
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
    //A S M Q
    console.log('payload', payload)
    payload.fundActivities.fundActivity = [
      {
        "regularPayment": this.input.regularPayment,
        "attainAge": this.input.insuredAge
      },
      {
        "regularPayment": 0.00,
        "attainAge": "" + (+this.input.insuredAge + +this.input.duration)
      }

    ];

    //console.log(payload)

  }

}
