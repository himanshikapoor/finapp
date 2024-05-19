import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import { HotToastService } from '@ngneat/hot-toast';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder)
  loginService = inject(LoginService)
  dataService = inject(DataService)
  authService = inject(AuthService)
  toast = inject(HotToastService)
  router = inject(Router)
 
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(): void {
    console.log(this.userForm)

    if (this.userForm.valid) {
      this.loginService.loginUser(this.userForm.value)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "You have been logged in successfully",
          error: "Couldn't login - Invalid Credentials"
        })
      )
      .subscribe(response => {
        this.dataService.userData = {
          email: response.email,
          first_name: response.first_name,
          last_name: response.last_name,
          password: response.password,
          username: response.username,
        }
        
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard'])
      })
    }
  }

}
