import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  getUserList() {
    return {
      insured: {
        type: 'insured',
        name: 'John insured',
        id: 'insured id',
        insuredAge: 30,
        sex: 'M'
      },
      owner: {
        type: 'owner',
        name: 'Peter owner',
        id: 'owner id',
        insuredAge: 26,
        sex: 'M'
      },
      dependents: [
        {
          type: 'dependent',
          name: 'Jackie sister',
          id: 'dependent 1 id',
          insuredAge: 28,
          sex: 'F'
        },
        {
          type: 'dependent',
          name: 'Mary auntie',
          id: 'dependent 2 id',
          insuredAge: 35,
          sex: 'F'
        },
        {
          type: 'dependent',
          name: 'Crystal daugther',
          id: 'dependent 3 id',
          insuredAge: 15,
          sex: 'F'
        }
      ]
    }

  }

}
