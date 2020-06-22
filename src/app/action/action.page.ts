import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import  { UserService } from '../services/user.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {

  constructor( 
  	private userService: UserService,
  	public toast: ToastController,
    public storage: Storage
  	) { }

  users: any;
  action_types: any;
  sActionType: any;
  assigned_to: any;
  assigned_until: any;
  priorities: any;
  priority: any;
  comment: any;
  additional_info: any;
  escalation_profiles: any;
  sEscalationProfile: any;
  feedback = true;
  sIntroducedBy: any;
  sPlant: any;

  ngOnInit() {
    this.userService.getUsers().subscribe((res)=>{
      this.users = res
      console.log(res)
    });

    this.userService.getActionTypes().subscribe((res)=>{
      this.action_types = res
      console.log(res)
    });

    this.priorities = [
      { id: 'high', name: 'High' },
      { id: 'medium', name: 'Medium' },
      { id: 'low', name: 'Low' }
    ];

    this.storage.get('plant').then((val) => {
    	console.log(val)
    	this.sPlant = val.smandnr
        this.userService.getEscalationProfile(val.nlfdmandnr).subscribe((res)=>{
	      this.escalation_profiles = res
	      console.log(res)
	    });
      });

    this.storage.get('userName').then((val) => {
        
	    this.sIntroducedBy = val
    });

    

  }

async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  assignedToChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
  		this.assigned_to = event.value
      	console.log('assignedTo:', event.value);
  }



  actionTypeChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
  		this.sActionType = event.value
      	console.log('action_type:', event.value);
  }

  priorityChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
  		this.priority = event.value
      	console.log('priority:', event.value);
  }

  escalationChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
  		this.sEscalationProfile = event.value
      	console.log('priority:', event.value);
  }

  addAction(form){
  	 let data = {sActionType: this.sActionType.sActionType, sEscalationProfile: this.sEscalationProfile.sEscProfile, fFeedback: this.feedback, sAction: form.value.action, sIntroducedBy: this.sIntroducedBy, sPlant: this.sPlant, sAssignedTo: this.assigned_to.sPersName, DTAssignedUntil: form.value.assigned_until, sPriority: this.priority.id}
  	 // data.sActionType = this.sActionType
    console.log(data)
    this.userService.addAction(data).subscribe((res)=>{
      this.presentToast('Added action successfully !')
      console.log(res)
      this.sActionType = {}
      this.sEscalationProfile = {}
      this.assigned_to = {}
      this.priority = {}
      form.value = {}
    },
    err => {
      this.presentToast(err.message)
        console.log(err);
    });
  
  }


}
