import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the HelmetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-helmet',
  templateUrl: 'helmet.html',
  

})
export class HelmetPage {

/*
  id : string;
  characteristic : string;
  service : string;
*/
  constructor(public navCtrl: NavController, public navParams: NavParams, private ble: BLE) {
  }

  ionViewDidLoad() {
	}
}


