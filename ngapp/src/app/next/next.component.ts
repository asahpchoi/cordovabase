import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import cf from 'conversational-form';


@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.css']
})
export class NextComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: ['', Validators.required],
      city: [''],
      state: ['', Validators.required],
      zip: ['']
    }),
  });

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //var cfInstance = cf.startTheConversation({
     // formEl: document.getElementById("myForm")
 // });
  }

  nextFields(object) {

  
    let elements : any = document.getElementsByClassName("mf");
 
    for (let i=0; i< elements.length - 1; i++) {
      let item = elements[i];
    
      if(item.id == object.id) {
        console.log(elements[i+1])
        setTimeout(
          ()=>{
            elements[i+1].focus();
          },100, true
        )
      
         
      }
    }
  }
}
