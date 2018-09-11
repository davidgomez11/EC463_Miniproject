import { Component } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
//import { LoginPage } from '../../pages/login/login';
import { NavController, App } from 'ionic-angular';

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  //text: string;
  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController,
  	          private afAuth: AngularFireAuth, 
              private gplus: GooglePlus,
              private platform: Platform,
              public appCtrl: App) {

  	this.user = this.afAuth.authState;

    //console.log('Hello GoogleLoginComponent Component');
    //this.text = 'Hello World';
  }

  async nativeGoogleLogin(): Promise<void> {
  try {

    const gplusUser = await this.gplus.login({
      'webClientId': 'x',
      'offline': true,
      'scopes': 'profile email'
    })

    return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)).then( (gplusUser) => {
    //Success, move to homepage.
    this.navCtrl.setRoot(TabsPage);
  }).catch((error) => {
    //Failed to log in, print error.
    console.log('signInWithCredential error', error);
  });;

  } catch(err) {
    console.log(err)
  }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

    } catch(err) {
      console.log(err)
    }

  }

  googleLogin() {
   if (this.platform.is('cordova')) {
     this.nativeGoogleLogin();
   } else {
    this.webGoogleLogin();
   }
  }

  signOut() {
  	this.afAuth.auth.signOut();
  	if (this.platform.is('cordova')) {
  		this.gplus.logout();
  	}
  }

  pushHome() {
    this.navCtrl.setRoot(TabsPage);
  }

}
