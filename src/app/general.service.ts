import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {}

  loadPermission() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', `/permissions.json`);
      req.onload = () => {
        return resolve(JSON.parse(req.response).permissions);
      };
      req.send();
    });
  }
}
