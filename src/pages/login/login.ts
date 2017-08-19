import { Component } from '@angular/core';

  import { MainPage } from '../../pages/pages';


import { TranslateService } from '@ngx-translate/core';
import { Auth, User, UserDetails, IDetailedError , } from '@ionic/cloud-angular';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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

  constructor(private toastCtrl: ToastController,  private storage: Storage, public navCtrl: NavController, public auth: Auth, public user: User,  public loadingCtrl: LoadingController) { }


  // Attempt to login in through our User service
  doLogin() {
    if (this.showLogin) {
      console.log('process login');

      if (this.email === '' || this.password === '') {
        let toast = this.toastCtrl.create({
          message: "请填写邮箱及密码",
          position: 'top',
          showCloseButton: true,
          closeButtonText: '确认'
        });
        toast.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "Logging in..."
      });
      loader.present();

      this.auth.login('basic', { 'email': this.email, 'password': this.password }).then(() => {
        loader.dismissAll();
        this.navCtrl.push(MainPage);
        this.storage.set('loginDetails', { 'email': this.email, 'password': this.password });
      }, (err) => {
        loader.dismissAll();
        console.log(err.message);
        let errors = '';
        if (err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if (err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

        let toast = this.toastCtrl.create({
          message: '登陆失败',
          position: 'top'                 
        });
        toast.present();
      });
    } else {
      this.showLogin = true;
    }
  }

  doRegister() {
    if (!this.showLogin) {
      console.log('process register');

      if (this.name === '' || this.email === '' || this.password === '') {
        let toast = this.toastCtrl.create({
          message: '请填写相应信息',
          position: 'top',
          showCloseButton: true,
          closeButtonText: '确认'
        });
        toast.present();
        return;
      }

      let details: UserDetails = { 'email': this.email, 'password': this.password, 'name': this.name };
      console.log(details);

      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        this.storage.set('loginDetails', { 'email': this.email, 'password': this.password });        
        console.log('ok signup');
        this.auth.login('basic', { 'email': details.email, 'password': details.password }).then(() => {
          loader.dismissAll();
          this.toastCtrl.create({
            message: '注册成功',
            position: 'top'
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
          if (e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let toast = this.toastCtrl.create({
          message: '注册失败',
          position: 'top'
        });
        toast.present();
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
