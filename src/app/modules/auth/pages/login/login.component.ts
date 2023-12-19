import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: boolean = false
  loggedUser!: User | null

  constructor(
    private _formBuilder:FormBuilder, 
    private _authService: AuthService, 
    private _router: Router
    ){
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(8)]],
    })
    this.loggedUser = this._authService.getloggedUser()
  }

  ngOnInit(): void {
    if(this.loggedUser){
      this.redirect(this.loggedUser.role)
    }    
  }

  redirect = (role:string) => {
    if(role === 'admin'){
      this._router.navigate(['/games']);
    } else {
      this._router.navigate(['/purchases']);
    }
    
  }

  submitForm = () => {
    if(this.loginForm.valid){
      this.errorMessage = false;
      let formValues: any = this.loginForm.value
      console.log(formValues);
  
      this._authService.checkUser(formValues).subscribe({
        next: (response) => {
          this.redirect(response.role)
        },
        error: (error) => {
          this.errorMessage = true;
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
