import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent {
  ads:any=[];
  constructor(private clientService:ClientService){}
  ngOnInit(){
    this.getAllAds();
  }


  getAllAds(){
    this.clientService.getAllAds().subscribe(res=>{
      this.ads=res;
    })
  }

  updateImg(img){
    return 'data:image/jpeg;base64,' + img ;
  }

}
