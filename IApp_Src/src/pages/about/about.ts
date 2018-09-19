import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	valueListRef$: AngularFireList<any[]>
	user: Observable<firebase.User>;
    uid: string;
    items: Array<any> = [];
    xArray: any[] = [];
    yArray: any[] = [];
    itemRef;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  	this.user = this.afAuth.authState;
  	this.uid = this.afAuth.auth.currentUser.uid;
  	this.valueListRef$ = this.db.list('chart/' + this.uid)

  	this.itemRef = firebase.database().ref('chart/' + this.uid).orderByKey();
  	this.itemRef.on('value', (snapshot) => {
  		//this.xArray.splice(0, this.xArray.length);
  		//this.yArray.splice(0, this.yArray.length);
  		this.items.splice(0, this.items.length);
  		this.items.push(["Time : ","Temperature, Humidity"]);
  		snapshot.forEach((childSnapshot) => {
  			this.items.push([(childSnapshot.key + " : "), childSnapshot.val()]);
  			//this.xArray.push(childSnapshot.key);
  			//this.yArray.push(childSnapshot.val());
  		});
      //console.log("This is xArray in about: " + this.xArray);
      //console.log("This is yArray in about: " + this.yArray);
      console.log("This is items in about: " + this.items);
  	});
  }

  /*ionViewDidLoad() {
  	this.itemRef.on('value', itemSnapshot => {
    	this.items = [];
    		itemSnapshot.forEach( itemSnap => {
    			console.log("This is itemSnap: " + itemSnap)
      			this.items.push(itemSnap.val());
      			return false;
    		});
    	console.log("This is items : " + this.items);
  	});
  }*/

}
