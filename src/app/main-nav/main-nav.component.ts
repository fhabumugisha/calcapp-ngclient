import { Component, OnDestroy, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SwPush } from '@angular/service-worker';
import { PwaService } from '../shared/pwa.service';
import { PushNotificationsService } from 'ng-push';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isAuthenticated = false;
    private userSub: Subscription;

    readonly VAPID_PUBLIC_KEY = 'BBCLVrc4fofi36hjglFOS0vdnpohmKtBEIKTQCrB6ShQJs3HtoHj4_x3D3KfESxAdlR4PrMpjlwU03Os-quOtoo';

   @Output() switchLanguage = new EventEmitter<string>();

   subExist = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private swPush: SwPush,
              private pwaService: PwaService,
              private pushNotifications: PushNotificationsService) {}

  ngOnInit() {

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.isSubscriptionPresent();
  }


  changerLanguage(language: string) {
    // this.translate.use(language);
    // this.language = language;
    this.switchLanguage.emit(language);

  }
  onLogout() {
    this.authService.logout();
  }
  onChange(ob: MatSlideToggleChange) {
    console.log(ob.checked);

    if (ob.checked) {
        this.subscribeToNotifications();
    } else {
      if (this.swPush.isEnabled) {
        const subEndpoint  =  this.isSubscriptionPresent();
        if(subEndpoint){
          this.pwaService.removePushSubscriber(subEndpoint).subscribe((data) => {
            this.swPush.unsubscribe().then(() => {
              this.subExist = true;
              console.log('Unsuscribed to push notifications');
            })
            .catch((error) => console.log(error));
          },
          (error) => {
            console.log(error);
          });
        }


      }
    }


  }
  subscribeToNotifications() {
    if (this.swPush.isEnabled) {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log(sub.toJSON());
      return this.pwaService.addPushSubscriber(sub.toJSON()).toPromise();
    }).then(() => {
       this.notify();
       this.subExist = true;
    })
    .catch(err => console.error('Could not subscribe to notifications', err));
  }
}

notify() { // our function to be called on click
  const options = { // set options
    body: 'You successfully subscribed to our Notification service!',
    icon: 'assets/icons/icon-96x96.png',
		lang: 'fr-FR', // BCP 47,
    vibrate: [100, 50, 200],
    tag: 'confirm-notification',
		renotify: true
  };
  this.pushNotifications.create('Calcapp.io', options).subscribe( // creates a notification
      res => console.log(res),
      err => console.log(err)
  );
}

isSubscriptionPresent() {
  let subEndpoint =  '';
  if (this.swPush.isEnabled) {
    this.swPush.subscription.pipe(take(1)).subscribe((sub: PushSubscription | null) => {
      if (sub === null) {
        console.log('Not subscribed to push notifications.');
      } else {
        this.subExist = true;
        subEndpoint =  sub.endpoint;
      }
    });
  }
  return subEndpoint;
}
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
