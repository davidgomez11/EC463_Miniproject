import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController,
  			  private afAuth: AngularFireAuth,
  			  private platform: Platform,
  			  private gplus: GooglePlus ) {

  	this.user = this.afAuth.authState;

  }

  signOut() {
  	this.afAuth.auth.signOut();
  	if (this.platform.is('cordova')) {
  		this.gplus.logout();
  	}
  }

}
