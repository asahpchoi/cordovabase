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
            , return: {
              high: 5,
              low: 3
            }, history: {
              2010: 0.1,
              2011: -21.9,
              2012: 24.7,
              2013: 28.6,
              2014: 8.3,
              2015: 1,
              2016: 14.3,
            }
          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNBAL",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "BALANCE FUND",
            "FUND_NAME_ENG": "Balanced Fund"
            , return: {
              high: 5.9,
              low: 3.9
            }, history: {
              2010: 3.5,
              2011: -9,
              2012: 17.9,
              2013: 19.2,
              2014: 9.1,
              2015: 1.6,
              2016: 10.7,
            }

          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNDIV",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "STB FUND",
            "FUND_NAME_ENG": "Diversified Fund"
            , return: {
              high: 6.5,
              low: 3.3
            }, history: {

            }

          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNFIX",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "STB FUND",
            "FUND_NAME_ENG": "Fixed Income Fund "
            , return: {
              high: 7.4,
              low: 2.4
            }, history: {

            }

          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNGRW",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "GROWTH FUND",
            "FUND_NAME_ENG": "Growth Fund"
            , return: {
              high: 8,
              low: 1.8
            }, history: {
              2010: 1.2,
              2011: -15.3,
              2012: 20.8,
              2013: 23.2,
              2014: 8.4,
              2015: 1.3,
              2016: 12.4,
            }

          },
          {
            "PLAN_CODE": "RUV02",
            "VERS_NUM": "01",
            "FND_ID": "VNMMK",
            "FND_VERS": "01",
            "FND_NATIVE_DESC": "MMF FUND",
            "FUND_NAME_ENG": "Money Market Fund"
            , return: {
              high: 8.7,
              low: 1.3
            }, history: {

            }

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
