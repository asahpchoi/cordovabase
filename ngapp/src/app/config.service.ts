import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }

  getConfig(id): any {
    switch (id) {
      case "funds":
        return [
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNAGR",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "AGGRESIVE FUND",
            "FUND_NAME_ENG": "Aggressive Fund"
          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNBAL",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "BALANCE FUND",
            "FUND_NAME_ENG": "Balanced Fund"
          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNDIV",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "STB FUND",
            "FUND_NAME_ENG": "Diversified Fund"
          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNFIX",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "STB FUND",
            "FUND_NAME_ENG": "Fixed Income Fund "
          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNGRW",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "GROWTH FUND",
            "FUND_NAME_ENG": "Growth Fund"
          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNMMK",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "MMF FUND",
            "FUND_NAME_ENG": "Money Market Fund"
          },
          {
            "PLAN_CODE": "RUV03",
            "VERS_NUM": "01",
            "FND_ID": "VNAGR",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "AGGRESIVE FUND",
            "FUND_NAME_ENG": "Aggressive Fund"
          },
          {
            "PLAN_CODE": "RUV03",
            "VERS_NUM": "01",
            "FND_ID": "VNBAL",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "BALANCE FUND",
            "FUND_NAME_ENG": "Balanced Fund"
          },
          {
            "PLAN_CODE": "RUV03",
            "VERS_NUM": "01",
            "FND_ID": "VNDIV",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "STB FUND",
            "FUND_NAME_ENG": "Diversified Fund"
          },
          {
            "PLAN_CODE": "RUV03",
            "VERS_NUM": "01",
            "FND_ID": "VNFIX",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "STB FUND",
            "FUND_NAME_ENG": "Fixed Income Fund "
          },
          {
            "PLAN_CODE": "RUV03",
            "VERS_NUM": "01",
            "FND_ID": "VNGRW",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "GROWTH FUND",
            "FUND_NAME_ENG": "Growth Fund"
          },
          {
            "PLAN_CODE": "RUV03",
            "VERS_NUM": "01",
            "FND_ID": "VNMMK",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "MMF FUND",
            "FUND_NAME_ENG": "Money Market Fund"
          },
        ]
      case "productCatelog":

    }

  }
}
