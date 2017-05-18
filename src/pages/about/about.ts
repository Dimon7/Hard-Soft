import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	socket : any;
	chats = [];

	host = "https://technobike.herokuapp.com";

	local = "http://192.168.137.1:3000";
  constructor(public navCtrl: NavController) {
  		console.log("Here");
  		this.socket = io.connect(this.host);

  		this.socket.on('emitPedalsParameters', (msg) => {
  			console.log("message", msg);
  		})

  }

 
}
