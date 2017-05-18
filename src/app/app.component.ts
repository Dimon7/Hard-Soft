import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { BLE } from '@ionic-native/ble';
import { HTTP } from '@ionic-native/http';


@Component({
  templateUrl: 'app.html',
  providers: [BLE]
})
export class MyApp {
  rootPage:any = TabsPage;
  id : string;
  characteristic : string;
  service : string;
  headers = new Headers({
      'Content-Type': 'application/json'
  });

  constructor(platform: Platform, 
              statusBar: StatusBar,
              splashScreen: SplashScreen, 
              private ble: BLE,
              private http: HTTP) {
    /*platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });*/


    ble.startScan([]).subscribe(device => {
      console.log('Shalom');
      console.log(JSON.stringify(device.name));
      this.id = device.id; //PROPISI
      // console.log(JSON.stringify(device.id));
      //console.log(JSON.stringify(device));
      ble.connect(this.id).subscribe( x => {
        console.log('X => ', x);
        this.characteristic = "19b10014-e8f2-537e-4f6c-d104768a1214";
        this.service = "19b10010-e8f2-537e-4f6c-d104768a1214";

       /* console.log('characteristic', this.characteristic);
        console.log('service', this.service);*/

        //console.log(JSON.stringify(x));
        ble.read(this.id, this.service, this.characteristic).then( battery => {
          console.log('Send =>' , this.bytesToString(battery).charCodeAt() );
        });


        let body = JSON.stringify({
           'baterry' : battery,
           'accelerate' : accelerate

        });
        this.http.post('', body,this.headers);


        //ble.read(device_id, service_uuid, characteristic_uuid, success, failure);
    });

    }, error => {
      console.log(error);
    });




  }
   bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

}




