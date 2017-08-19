import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError , } from '@ionic/cloud-angular';
import { MainPage } from '../../pages/pages';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(private toastCtrl: ToastController,  private storage: Storage, public navCtrl: NavController, public auth: Auth, public user: User,  public loadingCtrl: LoadingController) { }
  
  private  showLogin: boolean = true;
  showRegister: boolean = false;
  email: string = '';
  password: string = '';
  name: string = '';

  

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

  // signup() {
  //   this.navCtrl.push(SignupPage);
  // }
}
