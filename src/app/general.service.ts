import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  permissions = [];
  constructor() {}

  loadPermission() {
    const req = new XMLHttpRequest();
    req.open('GET', `/permissions.json`);
    req.onload = () => {
      this.permissions = JSON.parse(req.response).permissions;
      console.log('Config from file: ', this.permissions);
    };
    req.send();
  }
}
