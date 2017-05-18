import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {map} from "rxjs/operator/map";
import { TabsPage } from '../pages/tabs/tabs';
import { BLE } from '@ionic-native/ble';
import { Observable } from 'rxjs/Observable/';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'app.html',
  providers: [BLE]
})
export class MyApp {
  rootPage:any = TabsPage;

  id : string;
  characteristic : string;
  service : string;
  firstRead = true;
  prev = [];
  b = {};
  headers = new Headers();

  constructor(platform: Platform, 
              statusBar: StatusBar,
              splashScreen: SplashScreen, 
              private ble: BLE,
              public geolocation: Geolocation,
              private http :  Http) {


    
    this.headers.append('Accept', 'application/json');
   /* this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    this.headers.append("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token");*/
   /* 


    setInterval(() =>  {

     
        
     
     
      
    }, 1000);*/
     let i = 0;
    while (i<100){
      setTimeout(console.log(this.geo()),2000);
        
        i++;
    }
    
    
  
    console.log('ano');
    this.id = "98:4F:EE:10:86:8A";

    
       //PROPISI
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
          let body = JSON.stringify({
           'baterry' : battery,
           // 'accelerate' : accelerate

          });
          console.log(body);
        });


    }, error => {
      console.log(error);
    });




  }

   

  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

   
  geo(){
  
     this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((position) => {
    
        if (this.firstRead){
          this.firstRead = false;

          this.prev = [
            position.coords.latitude,
            position.coords.longitude
          ]    

        } else {
          this.b = {
            "path" : [this.prev, [
            position.coords.latitude,
            position.coords.longitude
            ]],
          }


          this.prev = [
            position.coords.latitude,
            position.coords.longitude
          ]  
          console.log(this.b);
          this.http.post('https://technobike.herokuapp.com/api/phone/position', this.b, this.headers)
              .subscribe( x => {
                 return x;
              })
                             

        }

      }, (err) => {
      console.log(err);
      });
    

  }
}

    

   







