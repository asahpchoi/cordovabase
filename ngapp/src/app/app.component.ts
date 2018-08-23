import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {
  trigger,
  animate,
  transition,
  style,
  query,
  group
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', group(
    [
      query(
        ':enter',
        [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('1s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1  }))
        ], { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)', opacity: 1  }),
          animate('1s ease-in-out', style({ transform: 'translateY(-100%)',  opacity: 0  }))
        ], { optional: true }
      ),
    ]))]);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation] // register the animation
})
export class AppComponent {
}
