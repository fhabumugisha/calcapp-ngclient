import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Calcapp';
  language: string;
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private updates: SwUpdate,
    public snackBar: MatSnackBar,
  ) {
    updates.available.subscribe(event => {
      console.log(event);
      const snackBarRef  = this.snackBar.open('New version available', 'Update');
      snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
      updates.activateUpdate().then(() => document.location.reload());
    });

    });
  }

  ngOnInit(): void {
    this.language = 'en';
    this.authService.autoLogin();
  }

  changerLanguage(language: string) {
    this.translate.use(language).subscribe(() => {
      this.language = language;
    });
  }
}
