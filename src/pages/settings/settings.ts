import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/settings';
import { JPush } from 'ionic3-jpush';
import { TranslateService } from '@ngx-translate/core';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';
import { Storage } from '@ionic/storage';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;
  settingList: any;
  settingMap:any;
  subSettings: any = SettingsPage;
  jpushArray: string[];

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public redditService: RedditDataProvider,
    public jpush: JPush,
    public storage: Storage) {
    var url = 'assets/json/settingList.json';
    this.redditService.getRemoteData(url).subscribe(
      data => {
        this.settingList = data.websites;
        this.settingMap = data.map;
      }
    );
  }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3],
      option4: [this.options.option4],
      option5: [this.options.option5],
      option6: [this.options.option6],
      option7: [this.options.option7],
      option8: [this.options.option8],
      option9: [this.options.option9],
      option10: [this.options.option10],
      option11: [this.options.option11],
      option12: [this.options.option12],
      option13: [this.options.option13],
      option14: [this.options.option14],
      list: [this.options.list]
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.storage.set("settingChanged", "NeedData");
      this.form.value.list = [];
      for (let key in this.form.value) {
        if (key === "list")
        continue;
        if(this.form.value[key]){
          this.form.value.list.push(this.settingMap[key]);
        }
      }
      this.settings.merge(this.form.value);
    });
    this.settings.load().then(data=> {
      this.jpush.setTags(data.list);
      console.log(data.list);
    })
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;
      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }


  // jpushTagSet() {
  //   let jpushArray: string[];
  //   this.settings.load().then((data) => {
  //     data.forEach(element => {
  //       if(element.value == true){
  //         jpushArray.concat(element);
  //       }
  //     });
  //   console.log(jpushArray);
  //   this.jpush.setTags(jpushArray);
  // });
  // }
}
