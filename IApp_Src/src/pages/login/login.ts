import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private afAuth: AngularFireAuth ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
  	console.log('ionViewDidEnter LoginPage');
  	var user = this.afAuth.auth.currentUser;

	if (user) {
  		// User is signed in.
  		this.navCtrl.setRoot(TabsPage);
	} else {
  		// No user is signed in.
	}
  }

}
