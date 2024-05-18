import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  http = inject(HttpClient)

  createUser(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/core/signup/', data);
  }
}
