import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';

@Component({
  selector: 'app-validation-result',
  templateUrl: './validation-result.component.html',
  styleUrls: ['./validation-result.component.css']
})
export class ValidationResultComponent implements OnInit {
  message;

  constructor(
    private pe: PeService
  ) {
    pe.getValidationResult().subscribe(
      vr => {
        this.message = vr;

      }
    )
  }

  ngOnInit() {
  }

}
