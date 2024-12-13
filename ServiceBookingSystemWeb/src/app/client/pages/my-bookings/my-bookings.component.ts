import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {
  bookedServices:any;
  bookings: any[] = [];

  constructor(private clientService:ClientService,private http: HttpClient,private router:Router,private notification:NzNotificationService ){}

  ngOnInit(){
    this.getMyBookings();
  }

  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res=>{
      this.bookedServices=res;
    })
  }
  deleteBooking(bookingId: number) {
    this.clientService.deleteService(bookingId).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        'Review posted successfully',
        {nzDuration:5000}
      );
      this.getMyBookings();
    },error=>{
      this.notification
      .error(
        'ERROR',
        `${error.message}`,
        {nzDuration:5000}
      );
    });
  }
}
