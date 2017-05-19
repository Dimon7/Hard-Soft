import { Component } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { TabsPage } from '../pages/tabs/tabs';
import { BLE } from '@ionic-native/ble';


import 'rxjs/add/operator/filter';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'app.html',
  providers: [BLE]
})
export class MyApp {
  rootPage:any = TabsPage;

  id : string;
  characteristic = [];
  service : string;
  firstRead = true;
  prev = [];
  //////////////
  watch : any;

    turn;
    fall;
    battery;
    stop;
    accelerate;
  /////////////
  b = {};
  body = [];
  headers = new Headers();
  global = 'https://technobike.herokuapp.com/api/phone/position';

  public lat: number = 0;
  public lng: number = 0;

  constructor(platform: Platform, 
              statusBar: StatusBar,
              splashScreen: SplashScreen, 
              private ble: BLE,
              public geolocation: Geolocation,
              private http :  Http,
              public zone: NgZone) {


    
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    this.headers.append("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token");
   
    let i =0;
    while(i < 100){
        //this.helmet();
        this.geo();

        i++;  

      
    }


  }


  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  helmet(){
    console.log('er');
    this.ble.scan([],1).subscribe( x=> {
      
      // this.id = x.id;
    
    
      this.id = "98:4F:EE:10:86:8A";
    
    
       //PROPISI
      // console.log(JSON.stringify(device.id));
      //console.log(JSON.stringify(device));
      this.ble.connect(this.id).subscribe( x => {
        // console.log('X => ', x);
        this.characteristic.push(
          
          "19b10011-e8f2-537e-4f6c-d104768a1214", //поворот
          "19b10012-e8f2-537e-4f6c-d104768a1214", //падав
          "19b10013-e8f2-537e-4f6c-d104768a1214", //стопе
          "19b10014-e8f2-537e-4f6c-d104768a1214", //батарея
          "19b10015-e8f2-537e-4f6c-d104768a1214"  //accelerate
            //прискорення
         );
        // console.log(this.characteristic);
       this.service = "19b10010-e8f2-537e-4f6c-d104768a1214";

       this.ble.read(this.id, this.service, this.characteristic[2]).then( stop => {
          this.stop = this.bytesToString(stop).charCodeAt();
          // console.log('Send =>' , this.battery );
          this.body.push({
           "stop" : this.stop
          });
        });  
        this.ble.read(this.id, this.service, this.characteristic[3]).then( battery => {
          this.battery = this.bytesToString(battery).charCodeAt();
          // console.log('Send =>' , this.battery );
          this.body.push({
           "baterry" : this.battery
          });
        });  

        this.ble.read(this.id, this.service, this.characteristic[0]).then( turn => {
          this.turn = this.bytesToString(turn).charCodeAt();
          // console.log('Send =>' , this.turn );
          this.body.push({
           "turn" : this.turn
          });
        });   

         this.ble.read(this.id, this.service, this.characteristic[1]).then( fall => {
          this.fall = this.bytesToString(fall).charCodeAt();
          // console.log('Send =>' , this.turn );
          this.body.push({
           "fall" : this.fall
          });
        });

         this.ble.read(this.id, this.service, this.characteristic[4]).then( accelerate => {
          this.accelerate = this.bytesToString(accelerate).charCodeAt();
          // console.log('Send =>' , this.turn );
          this.body.push({
           "accelerate" : this.accelerate
          });

          console.log(this.body);
          this.body = []; //clear

        });
              
                  
          
        

     });  
     }, error => {
      console.log(error);
    });
  }
   
  geo(){
    let options = {
      frequency: 3000, 
      enableHighAccuracy: true
    };
   /* console.log('in');
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
          // console.log(this.b);
          this.http.post(this.global, this.b, this.headers).subscribe( x => { console.log(x);  });
                             

        }

      }, (err) => {
        console.log(err);
      });
   */ 
     this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
       
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
          this.http.post(this.global, this.b, this.headers).subscribe( x => { console.log(x);  });
                             

        }
      }

        // console.log(position);
       
        // Run update inside of Angular's zone
       /* this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });

        console.log(this.lat);
        console.log(this.lng);
     
      });*/
   )}
}