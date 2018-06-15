import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'underscore';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  ctx: CanvasRenderingContext2D;
  x = [];
  inputX = [];
  inputY = [];
  model;

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.x = _.range(500);
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 5, inputShape: [1] }));
    this.model.add(tf.layers.dense({ units: 1 }));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  }

  train() {
    // Generate some synthetic data for training.
    const xs = tf.tensor2d(this.inputX, [this.inputX.length, 1]);
    const ys = tf.tensor2d(this.inputY, [this.inputY.length, 1]);

    // Train the model using the data.
    this.model.fit(xs, ys, { epochs: 10 }).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      this.model.predict(tf.tensor2d(this.x, [this.x.length, 1])).print();
    });

  }



  drawLine() {
    this.x.forEach(v => {
      this.drawdot(v, v);
    });
  }

  drawInput() {
    this.inputX.forEach(
      (x, i) => {
        let y = this.inputY[i];
        this.drawdot(x, y);
      }
    )
  }

  drawdot(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 1, y + 1);
    this.ctx.stroke();
  }

  dot(event) {
    this.ctx.clearRect(0, 0, 500, 500);
    this.inputX.push(event.layerX);
    this.inputY.push(event.layerY);
    //this.train();

    this.drawInput();
    //this.drawLine();
  }



}
