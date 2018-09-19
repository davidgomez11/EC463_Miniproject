import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../../pages/login/login';
import { App } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Observable<firebase.User>;
  uid: string;
  data: Observable<any[]>;


  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  private lineChart: any;
  private lineChart2: any;
  items;
  xArray: any[] = [];
  tempArray: any[] = [];
  humidArray: any[] = [];


  constructor(public navCtrl: NavController,
          private app:App,
  			  private afAuth: AngularFireAuth,
  			  private platform: Platform,
  			  private gplus: GooglePlus,
  			  private db: AngularFireDatabase,
  			  private toastCtrl: ToastController ) {

  	this.user = this.afAuth.authState;
  	this.uid = this.afAuth.auth.currentUser.uid;

  	// Adding dummy values for new user creation
    firebase.database().ref('chart/' + this.uid).set({"0" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"1" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"2" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"3" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"4" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"5" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"6" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"7" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"8" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"9" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)],
				"10" : [(Math.floor(Math.random() * (85 - 70 + 1)) + 70), (Math.floor(Math.random() * (50 - 40 + 1)) + 40)]
			});

  	// Look for data node inside of chart node
  	this.items = firebase.database().ref('chart/' + this.uid).orderByKey();
  	this.items.on('value', (snapshot) => {
  		this.xArray.splice(0, this.xArray.length);
  		this.tempArray.splice(0, this.tempArray.length);
      this.humidArray.splice(0, this.humidArray.length);
  		snapshot.forEach((childSnapshot) => {
  			this.xArray.push(childSnapshot.key);
  			this.tempArray.push(childSnapshot.val()[0]);
        this.humidArray.push(childSnapshot.val()[1]);
  		});
      console.log("This is xArray : " + this.xArray);
      console.log("This is yArray : " + this.tempArray);
  		this.basicChart(this.xArray, this.tempArray);
      this.basicChart2(this.xArray, this.humidArray);
  	});

  }

  basicChart(key, value){
  	this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  		type: 'line',
  		data: {
  			labels: key,
  			datasets: [{
  				label: "Temperature",
  				fill: true,
  				lineTension: 0.1,
  				backgroundColor: "rgba(72,138,255,0.4)",
  				borderColor: "rgba(72,138,255,1)",
  				borderCapStyle: "butt",
  				borderDash: [],
  				borderDashOffset: 0.0,
  				borderJoinStyle: 'miter',
  				pointBorderColor: "rgba(72,138,255,1)",
  				pointBackgroundColor: "#fff",
  				pointBorderWidth: 8,
  				pointHoverRadius: 5,
  				pointHoverBackgroundColor: "rgba(72,138,255,1)",
  				pointHoverBorderColor: "rgba(72,138,255,1)",
  				pointHoverBorderWidth: 2,
  				pointRadius: 3,
  				pointHitRadius: 10,
  				data: value,
  				spanGaps: "false",
  			}]
  		},
  		options: {
  			scales: {
  				xAxes: [{
  					scaleLabel: {
  						display: true,
  						labelString: 'Time'
  					}
  				}],
  			}
  		}
  	});
  }

  basicChart2(key, value){
    this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
      type: 'line',
      data: {
        labels: key,
        datasets: [{
          label: "Humidity",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(0,204,102,0.4)",
          borderColor: "rgba(0,204,102,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(0,204,102,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 8,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(0,204,102,1)",
          pointHoverBorderColor: "rgba(0,204,102,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: value,
          spanGaps: "false",
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
        }
      }
    });
  }

  /*ionViewDidLoad() {

  }*/

  signOut() {
  	this.afAuth.auth.signOut();
  	if (this.platform.is('cordova')) {
  		this.gplus.logout();
  	}
  	this.app.getRootNav().setRoot(LoginPage);
  }

}
