import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isAuthenticated = false;
    private userSub: Subscription;
   @Output() switchLanguage = new EventEmitter<string>();


  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService) {}

  ngOnInit() {

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }


  changerLanguage(language: string) {
    // this.translate.use(language);
    // this.language = language;
    this.switchLanguage.emit(language);

  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
