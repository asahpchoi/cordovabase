import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-takephoto',
  templateUrl: './takephoto.component.html',
  styleUrls: ['./takephoto.component.css']
})
export class TakephotoComponent implements OnInit {
  ctx;
  canvas: any;
  video;
  webcamStream: any;



  constructor() {
  }


  ngOnInit() {
    navigator.getUserMedia = (navigator.getUserMedia)

    // Get the canvas and obtain a context for
    // drawing in it
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext('2d');
    console.log(this.ctx)
  }

  startWebcam() {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(

        // constraints
        {
          video: true,
          audio: false
        },

        // successCallback
        (localMediaStream) => {
          let video: any = document.getElementById('video');

          video.src = window.URL.createObjectURL(localMediaStream);
          //this.webcamStream = localMediaStream;
        },

        // errorCallback
        function (err) {
          console.log("The following error occured: " + err);
        }
      );
    } else {
      console.log("getUserMedia not supported");
    }
  }

  stopWebcam() {
    this.webcamStream.stop();
  }



  takePhoto() {
    this.video = document.getElementById('video');
    // Draws current image from the video element into the canvas
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

  }

}
