import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class PwaService {
  baseApiUrl =  environment.apiUrl;
  constructor(private snackBar: MatSnackBar,
              private updates: SwUpdate,
              private http: HttpClient) {
    updates.available.subscribe(event => {
      console.log(event);
      const snackBarRef  = this.snackBar.open('New version available', 'Update');
      snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
      updates.activateUpdate().then(() => document.location.reload());
    });
    });
  }


  addPushSubscriber(sub: PushSubscriptionJSON) {
    const subscription = {
      notificationEndPoint: sub.endpoint,
      publicKey: sub.keys.p256dh,
      auth: sub.keys.auth
    };
    return this.http.post(this.baseApiUrl + '/api/notifications', subscription);
  }
  removePushSubscriber(subEndpoint: string) {
    return this.http.delete(this.baseApiUrl + '/api/notifications/' + subEndpoint);
  }


send() {
    return this.http.post('/api/newsletter', null);
}
}
