import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';


const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAllAds():Observable<any>{ 
    const adsObservable = this.http.get(BASIC_URL + `api/client/ads`, {
      headers: this.createAuthorizationHeader()
    });
  
    // Log the ads before returning the observable
    adsObservable.subscribe(ads => {
      console.log('Ads:', ads);
    });
  
    return adsObservable;
  }

  searchAdByName(name:any):Observable<any>{
   
    return this.http.get(BASIC_URL+ `api/client/search/${name}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  
  getAdDetailsById(adId:any):Observable<any>{
   
    return this.http.get(BASIC_URL+ `api/client/ad/${adId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  getTop8AdsByReservationCount():Observable<any>{
   
    return this.http.get(BASIC_URL+ `api/client/top-ads`,{
      headers:this.createAuthorizationHeader()
    })
  }
  getLatestAds():Observable<any>{
   
    return this.http.get(BASIC_URL+ `api/client/latest-ads`,{
      headers:this.createAuthorizationHeader()
    })
  }

  bookService(bookDTO:any):Observable<any>{
    
    return this.http.post(BASIC_URL+ `api/client/book-service`,bookDTO,{
      headers:this.createAuthorizationHeader()
    })
  }
  deleteService(bookId:any):Observable<any>{
    
    return this.http.delete(BASIC_URL+ `api/client/my-bookings/${bookId}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  giveReview(reviewDTO:any):Observable<any>{
    
    return this.http.post(BASIC_URL+ `api/client/review`,reviewDTO,{
      headers:this.createAuthorizationHeader()
    })
  }

  getMyBookings():Observable<any>{
    const userId=UserStorageService.getUserId()
    return this.http.get(BASIC_URL+ `api/client/my-bookings/${userId}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  
  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization','Bearer ' + UserStorageService.getToken());
  }

}
