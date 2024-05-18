import { Injectable } from '@angular/core';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData!: UserData; 

  constructor() { }

  getUserData(): UserData {
    return this.userData;
  }
}
