import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IonicSelectableComponent } from 'ionic-selectable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

import  { UserService } from '../services/user.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {

  constructor( 
  	private router: Router, 
  	private userService: UserService,
  	public toast: ToastController,
    public storage: Storage,
    private formBuilder: FormBuilder
  	) { }

  users: any;
  action_types: any;
  actions: any;
  action: any;
  actionNameControl: FormControl;
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
  showActionSelect = true;
  actionForm: FormGroup;

  @ViewChild('actionComponent') actionComponent: IonicSelectableComponent;

  ngOnInit() {
    this.actionNameControl = this.formBuilder.control(null, Validators.required);
    this.actionForm = this.formBuilder.group({
      actionName: this.actionNameControl
    });
    this.priorities = [
      { id: 'high', name: 'High' },
      { id: 'medium', name: 'Medium' },
      { id: 'low', name: 'Low' }
    ];

    this.storage.get('plant').then((val) => {
    	if(val==null){
    		this.router.navigateByUrl('login');
    		return false;
    	}
    	console.log(val)
    	this.sPlant = val.smandnr
        this.userService.getEscalationProfile(val.nlfdmandnr).subscribe((res)=>{
	      this.escalation_profiles = res
	      console.log(res)
	    });
	    this.userService.getUsers().subscribe((res)=>{
	      this.users = res
	      console.log(res)
	    });

	    this.userService.getActionTypes().subscribe((res)=>{
	      this.action_types = res
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
  		this.userService.getActionsByType(event.value.nActionTypeId).subscribe((res)=>{
	      this.actions = res
      	console.log('actions:', this.actions);
	    });
      	// console.log('actions:', event.value);
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

  actionChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
  		this.action = event.value
      	console.log('action:', event.value);
  }

  onSearchFail(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    // Clean form.
    this.actionNameControl.reset();

    // Copy search text to port name field, so
    // user doesn't have to type again.
    this.actionNameControl.setValue(event.component.searchText);

    // Show form.
    event.component.showAddItemTemplate();
  }

  onSearchSuccess(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    // Hide form.
    event.component.hideAddItemTemplate();
  }

  addActionTitle(event) {
    let newAction = {sTask: this.actionNameControl.value }
  	this.actions.push(newAction)
  	console.log(this.actionNameControl.value)
  	this.action = newAction
  	// console.log(event)
    // Show list.
    this.actionComponent.hideAddItemTemplate();
  }

  addAction(form){
  	let action = ''
  	

  	try {

  		console.log(this.showActionSelect)
	  	if(this.showActionSelect)
	  		action = this.action.sTask
	  	else
	  		action = form.value.action
	  	let data = {sActionType: this.sActionType.sActionType, sEscalationProfile: this.sEscalationProfile.sEscProfile, fFeedback: this.feedback, sAction: action, sIntroducedBy: this.sIntroducedBy, sPlant: this.sPlant, sAssignedTo: this.assigned_to.sPersName, DTAssignedUntil: form.value.assigned_until, sPriority: this.priority.id}


	  	 // data.sActionType = this.sActionType
	    console.log(data)
	    this.userService.addAction(data).subscribe((res)=>{
	      this.presentToast('Action created successfully !')
	      console.log(res)
	      this.sActionType = {}
	      this.sEscalationProfile = {}
	      this.assigned_to = {}
	      this.priority = {}
	      this.action = {}
	      form.resetForm()
	    },
	    err => {
	      this.presentToast(err.message)
	        // console.log(err);
	    });

	} catch (err) {

      	this.presentToast('Please fill in all the fields!')
	  	

	}
  	 
  	 
  
  }


}
