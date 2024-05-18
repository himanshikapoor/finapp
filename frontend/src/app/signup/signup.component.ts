import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  fb = inject(FormBuilder)
  signupService = inject(SignupService)
  dataService = inject(DataService)
  toast = inject(HotToastService)
  router = inject(Router)
  
  userForm!: FormGroup;
  
  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.signupService.createUser(this.userForm.value)
        .pipe(
          this.toast.observe({
            loading: 'Loading...',
            success: 'You have been registered successfully',
            error: 'User creation failed - An error occurred',
          })
        )
        .subscribe(response => {
          this.router.navigate(['/login']);
        })
    }
  }
}
