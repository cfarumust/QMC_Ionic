import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import  { UserService } from '../services/user.service';
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(   
                private router: Router,  
                private userService: UserService,
                public toast: ToastController,
                public storage: Storage
  ) { }

  plants: any;
  plant: any;
  flag = false;

  token: any;
  sel_plant: any;

  ngOnInit() {
    this.userService.getPlants().subscribe((res)=>{
          // this.router.navigateByUrl('action');
          this.plants = res
        });
      // console.log(localStorage.getItem("token"));
      if(localStorage.getItem("token")==null){
        
          this.router.navigateByUrl('action');
        }
    

    
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  login(form){
    // console.log(form.value)
    this.userService.login(form.value).subscribe((res)=>{
      this.presentToast('Login successful!')
      this.router.navigateByUrl('action');
      // console.log(res)
      localStorage.setItem("token", res.token);

      this.storage.set('userName', form.value.spers_idnr);
    },
    err => {
      this.presentToast(err.status+': Login failed!')
        // console.log(err.status+': Login failed!');
    });
  }

  plantChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
      this.storage.set('plant', event.value);
      this.flag = true;
      // console.log('port:', event.value);
  }

}
