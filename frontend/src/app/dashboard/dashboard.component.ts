import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dataService = inject(DataService)
  toast = inject(HotToastService)

  firstName: string = this.dataService.getUserData().first_name;

  showLogoutToast() {
    this.toast.success('Logged out successfully')
  }
}
