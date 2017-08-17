import { Component } from '@angular/core';

import { MainPage } from '../../pages/pages';


import { TranslateService } from '@ngx-translate/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;
  showLogin: boolean = true;
  showRegister: boolean = false;
  email: string = '';
  password: string = '';
  name: string = '';

  constructor(public navCtrl: NavController, public auth: Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

  // constructor(public navCtrl: NavController,
  //   public user: User,
  //   public toastCtrl: ToastController,
  //   public translateService: TranslateService) {

  //   this.translateService.get('LOGIN_ERROR').subscribe((value) => {
  //     this.loginErrorString = value;
  //   })
  // }

  // Attempt to login in through our User service
  doLogin() {
    //   this.user.login(this.account).subscribe((resp) => {
    //     this.navCtrl.push(MainPage);
    //   }, (err) => {
    //     this.navCtrl.push(MainPage);
    //     // Unable to log in
    //     let toast = this.toastCtrl.create({
    //       message: this.loginErrorString,
    //       duration: 3000,
    //       position: 'top'
    //     });
    //     toast.present();
    //   });
    if (this.showLogin) {
      console.log('process login');

      if (this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title: 'Register Error',
          subTitle: 'All fields are rquired',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "Logging in..."
      });
      loader.present();

      this.auth.login('basic', { 'email': this.email, 'password': this.password }).then(() => {
        loader.dismissAll();
        this.alertCtrl.create({
          title: '登陆成功'
        }).present();

        this.navCtrl.push(MainPage);

      }, (err) => {
        loader.dismissAll();
        console.log(err.message);
        let errors = '';
        if (err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if (err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

        let alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: errors,
          buttons: ['OK']
        });
        alert.present();
      });
    } else {
      this.showLogin = true;
    }
  }

  doRegister() {
    if (!this.showLogin) {
      console.log('process register');

      /*
      do our own initial validation
      */
      if (this.name === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title: 'Register Error',
          subTitle: 'All fields are rquired',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      let details: UserDetails = { 'email': this.email, 'password': this.password, 'name': this.name };
      console.log(details);

      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        console.log('ok signup');
        this.auth.login('basic', { 'email': details.email, 'password': details.password }).then(() => {
          loader.dismissAll();
          this.alertCtrl.create({
            title: 'success'
          }).present();
        });
        return this.auth.login('basic', { 'email': details.email, 'password': details.password }).then(() => {
          this.navCtrl.push(MainPage);

        }

        );

      }, (err: IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for (let e of err.details) {
          console.log(e);
          if (e === 'required_email') errors += 'Email is required.<br/>';
          if (e === 'required_password') errors += 'Password is required.<br/>';
          if (e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
          //don't need to worry about conflict_username
          if (e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let alert = this.alertCtrl.create({
          title: 'Register Error',
          subTitle: errors,
          buttons: ['OK']
        });
        alert.present();
      });

    } else {
      this.showLogin = false;
    }
  }

  doShowRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }
}
