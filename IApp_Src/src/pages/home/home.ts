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
  private lineChart: any;
  items;
  xArray: any[] = [];
  yArray: any[] = [];

  constructor(public navCtrl: NavController,
  			  private afAuth: AngularFireAuth,
  			  private platform: Platform,
  			  private gplus: GooglePlus,
  			  private db: AngularFireDatabase,
  			  private toastCtrl: ToastController ) {

  	this.user = this.afAuth.authState;
  	this.uid = this.afAuth.auth.currentUser.uid;

  	// Adding dummy values for new user creation
    firebase.database().ref('chart/' + this.uid).set({"0" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"1" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"2" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"3" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"4" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"5" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"6" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"7" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"8" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"9" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60),
				"10" : (Math.floor(Math.random() * (90 - 60 + 1)) + 60)
			});

  	// Look for data node inside of chart node
  	this.items = firebase.database().ref('chart/' + this.uid).orderByKey();
  	this.items.on('value', (snapshot) => {
  		this.xArray.splice(0, this.xArray.length);
  		this.yArray.splice(0, this.yArray.length);
  		snapshot.forEach((childSnapshot) => {
  			this.xArray.push(childSnapshot.key);
  			this.yArray.push(childSnapshot.val());
  		});
  		this.basicChart(this.xArray, this.yArray);
  	});

  }

  basicChart(key, value){
  	this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  		type: 'line',
  		data: {
  			labels: key,
  			datasets: [{
  				label: "Average Savings",
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
  						labelString: 'Ages'
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
  	this.navCtrl.setRoot(LoginPage);
  }

}
