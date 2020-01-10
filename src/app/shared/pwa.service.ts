import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: "root"
})
export class PwaService {
  constructor(private updates: SwUpdate) {
    updates.available.subscribe(event => {
      console.log(event);
      if (confirm("New version available. Load New Version?")) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
