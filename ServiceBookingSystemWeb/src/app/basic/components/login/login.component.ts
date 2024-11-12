import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  validateForm!:FormGroup;
  
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private notification:NzNotificationService,
    private router:Router
    ){}

    ngOnInit(){
      this.validateForm=this.fb.group({
        userName:[null,[Validators.required]],
        password:[null,[Validators.required]],

      })
    }

    submitForm(){
      this.authService.login(this.validateForm.get(['userName'])!.value,this.validateForm.get(['password'])!.value)
      .subscribe(res=>{
        console.log(res);

        if(UserStorageService.isClientLoggedIn()){
          this.router.navigateByUrl("client/dashboard")
        }else if(UserStorageService.isCompanyLoggedIn()){
          this.router.navigateByUrl("company/dashboard")
        }
        
        // this.notification
        // .success('SUCCESS',"Signup Successful",{nzDuration:5000});
        // this.router.navigateByUrl('/login');
      },error=>{
        this.notification
        .error('ERROR',`${error.error}`,{nzDuration:5000});
        console.log(error);
        
      })
    }

}
