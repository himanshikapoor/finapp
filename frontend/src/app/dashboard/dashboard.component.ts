import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dataService = inject(DataService)
  authService = inject(AuthService)
  toast = inject(HotToastService)

  firstName: string = this.dataService.getUserData()?.first_name;

  showLogoutToast() {
    this.authService.removeToken();
    this.toast.success('Logged out successfully')
  }
}
