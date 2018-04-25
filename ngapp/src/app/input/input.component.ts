import { Component, OnInit, ViewChild } from '@angular/core';
import { PeService } from '../pe.service';
import { NgModel } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

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
    term: {
      faceAmount: 0,
      plannedPremium: 0,
    },
    paymentMode : 'Annual'
  }



  ranges = {
    faceAmount: {
      min: 1000000,
      max: null
    },
    plannedPremium: {
      min: 7000,
      max: null
    }
  }
  faceAmountCtrl = new FormControl("", [Validators.min(this.ranges.faceAmount.min), Validators.required]);
  plannedPremiumCtrl = new FormControl("", [Validators.min(this.ranges.plannedPremium.min), Validators.required]);
  regularPaymentCtrl = new FormControl("", [Validators.required]);

  testcases;
  selectedTestcase;

  updateBaseProtection() {
    if (this.faceAmountCtrl.invalid) return
    this.pe.calculatePlannedPremiumRange007(this.input.faceAmount, this.input.insuredAge, this.input.paymentMode).
      subscribe(x => {
        let data: any = x;
        console.log('premium range', data)
        this.ranges.plannedPremium.min = Math.round(data.value.minLimit);
        this.ranges.plannedPremium.max = Math.round(data.value.maxLimit);
        this.input.plannedPremium = Math.round(data.value.defPremium);
        this.updateRegularPayment();
        //this.plannedPremiumCtrl.setValidators([Validators.min(this.ranges.plannedPremium.min), Validators.max(this.ranges.plannedPremium.max), Validators.required]);
      })
  }

  updateBasePremium() {
    if (this.plannedPremiumCtrl.invalid) return
    this.pe.calculateFaceAmountRange007(this.input.plannedPremium, this.input.insuredAge, this.input.paymentMode).
      subscribe(x => {
        let data: any = x;
        console.log('fa range', data)
        this.ranges.faceAmount.min = Math.max(1000000, Math.round(data.value.minLimit));
        this.ranges.faceAmount.max = Math.round(data.value.maxLimit);
        //this.faceAmountCtrl.setValidators([Validators.min(data.value.minLimit), Validators.max(data.value.maxLimit), Validators.required]);
      })
    this.updateRegularPayment();

  }

  getKeys(obj) {
    return Object.keys(obj);
  }

  constructor(private pe: PeService) {
    this.testcases = [
      {
        name: 'UL007',
        payload: this.UL007,
        productType: 'UL'
      }
      ,
      {
        name: 'ENC12',
        payload: this.ENC12,
        productType: 'CI'
      },

      {
        name: 'ADD03',
        payload: this.ADD03,
        productType: 'UVL'
      }
    ];
  }

  updateTermFaceAmount() {
    this.updatePayload();
    this.pe.premiumCalculation(this.selectedTestcase.payload).subscribe(
      d => {
        let data: any = d;
        console.log(data);
        //this.input.plannedPremium = data.premiums.premiums.filter(p => p.paymentMode == this.paymentMode)[0].premium
        this.input.term.plannedPremium = data.riders["0"].premiums.premiums.filter(p => p.paymentMode == this.input.paymentMode)[0].premium
        this.updateRegularPayment();
      }
    )
  }
  updatePaymentMode() {
    this.updateTermFaceAmount();
    this.updateBaseProtection();
    this.updateBasePremium();
  }

  updateRegularPayment() {
    this.input.regularPayment = +this.input.plannedPremium + +this.input.term.plannedPremium;
    this.regularPaymentCtrl.setValidators([Validators.min(this.input.regularPayment), Validators.required]);
  }

  updatePayload() {
    if (!this.selectedTestcase) return;
    let payload = this.selectedTestcase.payload;

    payload.coverageInfo.parties.party.insuredAge = this.input.insuredAge;
    payload.coverageInfo.plannedPremium = this.input.plannedPremium;
    payload.coverageInfo.faceAmount = this.input.faceAmount;
    if(this.input.term.faceAmount != 0) {
      payload.riders.coverageInfo["0"].faceAmount = this.input.term.faceAmount;
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

  calculate() {

    this.updatePayload()

    if (this.selectedTestcase.payload) {
      this.pe.calculate(this.selectedTestcase.payload, this.selectedTestcase.productType);
    }
  }

  validate() {
    this.updatePayload()
    if (this.selectedTestcase.payload) {
      this.pe.validate(this.selectedTestcase.payload);
    }
  }

  ngOnInit() {
    console.log(this.ranges)

  }

  ENC12 = {
    "watchPoints": [],
    "riders": {
      "coverageInfo": []
    },
    "dependents": [],
    "funds": {
      "fundRecord": [{
        "returnRate": 4.0000,
        "returnRateMedium": 5.0000,
        "returnRateHigh": 7.0000,
        "code": "UL007",
        "allocation": 100
      }]
    },
    "fundActivities": {
      "fundActivity": []
    },
    "owner": {
      "ownerSex": "M",
      "ownerId": "MINH, ENC12",
      "ownerDOB": "19800101070000",
      "ownerAge": 38,
      "insuredIsOwner": false
    },
    "stopDebugYear": 5,
    "startDebugYear": 0,
    "sortRider": "N",
    "reference": "PROP-000000315",
    "policyYearDate": "20180101070000",
    "policyExcludeSOS": "N",
    "language": "en_vn",
    "enableDebug": false,
    "displayEOYOnly": false,
    "coverageInfo": {
      "regularPayment": 0.00,
      "startAnnuityAge": "0",
      "prepayYear": 0,
      "plannedPremium": 0,
      "product": {
        "productKey": {
          "valueDate": "20180101070000",
          "location": "VN",
          "basicProduct": {
            "productPK": {
              "productId": "--"
            }
          },
          "associateProduct": {
            "productPK": {
              "productId": "--"
            }
          },
          "primaryProduct": {
            "productPK": {
              "productId": "ENC12"
            }
          }
        }
      },
      "parties": {
        "party": {
          "type": "BASIC",
          "smokingStatus": "NS",
          "insuredSex": "M",
          "insuredId": "MINH, ENC12",
          "insuredAge": 1,
          "birthDate": "20170101070000"
        }
      },
      "options": {
        "paymentMode": "A",
        "fundWithdrawalsByPercentage": "N",
        "calculateSinglePremiumBand": "N",
        "billingMethod": "DirectBilling"
      },
      "noOfInstallmentYear": 0,
      "initialDumpIn": 0.00,
      "faceAmount": 1000000.00,
      "extraRating": {
        "tempPercentage": 1.00,
        "tempPercentageDuration": 0,
        "tempFlat": 0.00,
        "tempFlatDuration": 0,
        "percentageExtra": 1.00,
        "flatExtra": 0.00
      },
      "currency": {
        "currencyPK": {
          "currencyId": "VND"
        }
      }
    },
    "channel": "Agency"
  }
  ADD03 = {
    "riders": {
      "coverageInfo": []
    },
    "dependents": [],
    "funds": {
      "fundRecord": []
    },
    "fundActivities": {
      "fundActivity": []
    },
    "owner": {
      "ownerSex": "M",
      "ownerId": "Test Projection Case 1",
      "ownerDOB": "19890305070000",
      "ownerAge": 29,
      "insuredIsOwner": false
    },
    "stopDebugYear": 10,
    "startDebugYear": 0,
    "sortRider": "N",
    "reference": "PROP-000000027",
    "policyYearDate": "20180305070000",
    "policyExcludeSOS": "N",
    "language": "en_vn",
    "enableDebug": true,
    "displayEOYOnly": false,
    "coverageInfo": {
      "startAnnuityAge": "0",
      "prepayYear": 0,
      "product": {
        "productKey": {
          "valueDate": "20180305070000",
          "location": "VN",
          "basicProduct": {
            "productPK": {
              "productId": "--"
            }
          },
          "associateProduct": {
            "productPK": {
              "productId": "--"
            }
          },
          "primaryProduct": {
            "productPK": {
              "productId": "ADD03"
            }
          }
        }
      },
      "parties": {
        "party": {
          "type": "BASIC",
          "smokingStatus": "NS",
          "insuredSex": "M",
          "insuredId": "-VALID, ADD03 as Base Plan",
          "insuredAge": 29,
          "birthDate": "19890305070000"
        }
      },
      "options": {
        "paymentMode": "A",
        "fundWithdrawalsByPercentage": "N",
        "calculateSinglePremiumBand": "N",
        "billingMethod": "DirectBilling"
      },
      "noOfInstallmentYear": 0,
      "initialDumpIn": 0.00,
      "faceAmount": 800000.00,
      "extraRating": {
        "tempPercentage": 1.00,
        "tempPercentageDuration": 0,
        "tempFlat": 0.00,
        "tempFlatDuration": 0,
        "percentageExtra": 1.00,
        "flatExtra": 0.00
      },
      "currency": {
        "currencyPK": {
          "currencyId": "VND"
        }
      }
    },
    "channel": "Agency"
  }
  UL007 = {
    "watchPoints": [],

    "dependents": [],
    "funds": {
      "fundRecord": [{
        "returnRate": 4.0000,
        "returnRateMedium": 5.0000,
        "returnRateHigh": 7.0000,
        "code": "UL007",
        "allocation": 100
      }]
    },
    "fundActivities": {
      "fundActivity": null
    },
    "owner": {
      "ownerSex": "M",
      "ownerId": "PROJ, RIDER(ADD 800K)",
      "ownerDOB": "19890101070000",
      "ownerAge": 29,
      "insuredIsOwner": false
    },
    "stopDebugYear": 10,
    "startDebugYear": 0,
    "sortRider": "N",
    "reference": "PROP-000000659",
    "policyYearDate": "20180313070000",
    "policyExcludeSOS": "N",
    "language": "en_vn",
    "enableDebug": false,
    "displayEOYOnly": false,
    "riders": {
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
            "insuredAge": 29,
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
      }]
    },
    "coverageInfo": {
      "startAnnuityAge": "0",
      "prepayYear": 0,
      "plannedPremium": 10000,
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
              "productId": "--"
            }
          },
          "primaryProduct": {
            "productPK": {
              "productId": "UL007"
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
          "insuredAge": 29,
          "birthDate": "19890101070000"
        }
      },
      "options": {
        "paymentMode": "A",
        "fundWithdrawalsByPercentage": "N",
        "dbLevel": "Increase",
        "calculateSinglePremiumBand": "N",
        "billingMethod": "DirectBilling"
      },
      "noOfInstallmentYear": 0,
      "initialDumpIn": 0.00,
      "faceAmount": 800000.00,
      "extraRating": {
        "tempPercentage": 1.00,
        "tempPercentageDuration": 0,
        "tempFlat": 0.00,
        "tempFlatDuration": 0,
        "percentageExtra": 1.00,
        "flatExtra": 0.00
      },
      "currency": {
        "currencyPK": {
          "currencyId": "VND"
        }
      }
    },
    "channel": "Agency"
  }
  /*
  UL007 = {
    "channel": "Agency",
    "coverageInfo": {
      "currency": {
        "currencyPK": {
          "currencyId": "VND"
        }
      },
      "extraRating": {
        "flatExtra": 0,
        "percentageExtra": 1,
        "tempFlatDuration": 0,
        "tempFlat": 0,
        "tempPercentageDuration": 0,
        "tempPercentage": 1
      },
      "faceAmount": 500000,
      "initialDumpIn": 0,
      "noOfInstallmentYear": 0,
      "options": {
        "billingMethod": "DirectBilling",
        "calculateSinglePremiumBand": "N",
        "dbLevel": "Increase",
        "fundWithdrawalsByPercentage": "N",
        "paymentMode": "A"
      },
      "parties": {
        "party": {
          "birthDate": "19800101070000",
          "insuredAge": 38,
          "insuredId": "-VALID, Total Premium Test",
          "insuredSex": "F",
          "smokingStatus": "NS",
          "type": "BASIC"
        }
      },
      "product": {
        "productKey": {
          "primaryProduct": {
            "productPK": {
              "productId": "UL007"
            }
          },
          "associateProduct": {
            "productPK": {
              "productId": "--"
            }
          },
          "basicProduct": {
            "productPK": {
              "productId": "--"
            }
          },
          "location": "VN",
          "valueDate": "20180102070000"
        }
      },
      "plannedPremium": 8334,
      "prepayYear": 0,
      "startAnnuityAge": "0"
    },
    "displayEOYOnly": false,
    "enableDebug": true,
    "language": "en_vn",
    "policyExcludeSOS": "N",
    "policyYearDate": "20180102070000",
    "reference": "PROP-000000065",
    "sortRider": "N",
    "startDebugYear": 0,
    "stopDebugYear": 10,
    "owner": {
      "insuredIsOwner": false,
      "ownerAge": 38,
      "ownerDOB": "19800101070000",
      "ownerId": "Owner Name XXX",
      "ownerSex": "F"
    },
    "fundActivities": {
      "fundActivity": []
    },
    "funds": {
      "fundRecord": [
        {
          "allocation": 100,
          "code": "UL007",
          "returnRateHigh": 7,
          "returnRateMedium": 5,
          "returnRate": 4
        }
      ]
    },
    "dependents": [],
    "riders": {
      "coverageInfo": []
    },
    "watchPoints": []
  }

  UL007 = {
    "watchPoints": [],
    "riders": {
      "coverageInfo": []
    },
    "dependents": [],
    "funds": {
      "fundRecord": [{
        "returnRate": 4.0000,
        "returnRateMedium": 5.0000,
        "returnRateHigh": 7.0000,
        "code": "UL007",
        "allocation": 100
      }]
    },
    "fundActivities": {
      "fundActivity": [{
        "faceAmount": 700000,
        "attainAge": 39
      }]
    },
    "owner": {
      "ownerSex": "M",
      "ownerId": "PROJ, RIDER(ADD 800K)",
      "ownerDOB": "19890101070000",
      "ownerAge": 29,
      "insuredIsOwner": false
    },
    "stopDebugYear": 10,
    "startDebugYear": 0,
    "sortRider": "N",
    "reference": "PROP-000000658",
    "policyYearDate": "20180313070000",
    "policyExcludeSOS": "N",
    "language": "en_vn",
    "enableDebug": true,
    "displayEOYOnly": false,
    "coverageInfo": {
      "startAnnuityAge": "0",
      "prepayYear": 0,
      "plannedPremium": 10000,
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
              "productId": "--"
            }
          },
          "primaryProduct": {
            "productPK": {
              "productId": "UL007"
            }
          }
        }
      },
      "parties": {
        "party": {
          "type": "BASIC",
          "smokingStatus": "NS",
          "insuredSex": "M",
          "insuredId": "PROJ, FA CHANGE AT Y11",
          "insuredAge": 29,
          "birthDate": "19890101070000"
        }
      },
      "options": {
        "paymentMode": "A",
        "fundWithdrawalsByPercentage": "N",
        "dbLevel": "Increase",
        "calculateSinglePremiumBand": "N",
        "billingMethod": "DirectBilling"
      },
      "noOfInstallmentYear": 0,
      "initialDumpIn": 0.00,
      "faceAmount": 800000.00,
      "extraRating": {
        "tempPercentage": 1.00,
        "tempPercentageDuration": 0,
        "tempFlat": 0.00,
        "tempFlatDuration": 0,
        "percentageExtra": 1.00,
        "flatExtra": 0.00
      },
      "currency": {
        "currencyPK": {
          "currencyId": "VND"
        }
      }
    },
    "channel": "Agency"
  }
  {
  "watchPoints" : [ ],
  "riders" : {
    "coverageInfo" : [ {
      "product" : {
        "productKey" : {
          "valueDate" : "20180401070000",
          "location" : "VN",
          "basicProduct" : {
            "productPK" : {
              "productId" : "--"
            }
          },
          "associateProduct" : {
            "productPK" : {
              "productId" : "UL007"
            }
          },
          "primaryProduct" : {
            "productPK" : {
              "productId" : "TRI07"
            }
          }
        }
      },
      "parties" : {
        "party" : {
          "insuredAge" : 18,
          "type" : "BASIC",
          "smokingStatus" : "NS",
          "insuredSex" : "M",
          "insuredId" : "H-3032 Rider TR7 ,FA cannot lower than lower limit",
          "birthDate" : "19991111070000"
        }
      },
      "faceAmount" : 100000.00,
      "extraRating" : {
        "tempPercentage" : 1.00,
        "percentageExtra" : 1.00
      },
      "currency" : {
        "currencyPK" : {
          "currencyId" : "VND"
        }
      }
    } ]
  },
  "dependents" : [ ],
  "funds" : {
    "fundRecord" : [ {
      "returnRate" : 4.0000,
      "returnRateMedium" : 5.0000,
      "returnRateHigh" : 7.0000,
      "code" : "UL007",
      "allocation" : 100
    } ]
  },
  "fundActivities" : {
    "fundActivity" : [ ]
  },
  "owner" : {
    "ownerSex" : "M",
    "ownerId" : "Owner Name XXX",
    "ownerDOB" : "19890305070000",
    "ownerAge" : 29,
    "insuredIsOwner" : false
  },
  "stopDebugYear" : 10,
  "startDebugYear" : 0,
  "sortRider" : "N",
  "reference" : "PROP-000000414",
  "policyYearDate" : "20180102070000",
  "policyExcludeSOS" : "N",
  "language" : "en_vn",
  "enableDebug" : true,
  "displayEOYOnly" : false,
  "coverageInfo" : {
    "startAnnuityAge" : "0",
    "prepayYear" : 0,
    "plannedPremium" : 10000,
    "product" : {
      "productKey" : {
        "valueDate" : "20180102070000",
        "location" : "VN",
        "basicProduct" : {
          "productPK" : {
            "productId" : "--"
          }
        },
        "associateProduct" : {
          "productPK" : {
            "productId" : "--"
          }
        },
        "primaryProduct" : {
          "productPK" : {
            "productId" : "UL007"
          }
        }
      }
    },
    "parties" : {
      "party" : {
        "type" : "BASIC",
        "smokingStatus" : "NS",
        "insuredSex" : "F",
        "insuredId" : "H-3032 Rider TR7 ,FA cannot lower than lower limit",
        "insuredAge" : 18,
        "birthDate" : "19991111070000"
      }
    },
    "options" : {
      "paymentMode" : "A",
      "fundWithdrawalsByPercentage" : "N",
      "dbLevel" : "Increase",
      "calculateSinglePremiumBand" : "N",
      "billingMethod" : "DirectBilling"
    },
    "noOfInstallmentYear" : 0,
    "initialDumpIn" : 0.00,
    "faceAmount" : 1000000.00,
    "extraRating" : {
      "tempPercentage" : 1.00,
      "tempPercentageDuration" : 0,
      "tempFlat" : 0.00,
      "tempFlatDuration" : 0,
      "percentageExtra" : 1.00,
      "flatExtra" : 0.00
    },
    "currency" : {
      "currencyPK" : {
        "currencyId" : "VND"
      }
    }
  },
  "channel" : "Agency"
}
  */

}
