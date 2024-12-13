import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {

  ads:any=[];
  adsOwners:any=[];
  validateForm:FormGroup;

  constructor(private clientService:ClientService,private fb:FormBuilder,private notification: NzNotificationService){}

  getAllAds(){
    this.clientService.getAllAds().subscribe(res=>{
      this.ads=res;
    })
  }


  ngOnInit(){
    this.validateForm=this.fb.group({
      service:[null,[Validators.required]],
    })
    this.getAllAds();
  }

  searchAdByName(){
    this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res=>{
      this.ads=res;
    })
  }

  updateImg(img){
    return 'data:image/jpeg;base64,' + img ;
  }

  submitContact() {
    this.notification.success(
      'SUCCESS',
      'Thank you for your message. We will check it soon!',
      {
        nzDuration: 5000,
        nzAnimate: true,
        nzPauseOnHover: true
      }
    );
  }
}
