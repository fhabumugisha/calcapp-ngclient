import { PwaService } from './shared/pwa.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Calcapp';
  language: string;
  local = "fr_FR";
  private LOCALE_FR = 'fr_FR';
  private LOCALE_EN = 'en-US';
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private pwa: PwaService

  ) {


  }

  ngOnInit(): void {
    this.language = 'en';
    this.authService.autoLogin();
    this.local = this.getLocal();
  }

  changerLanguage(language: string) {
    this.translate.use(language).subscribe(() => {
      this.language = language;
    });
  }

  getLocal(): string {
    switch (this.translate.currentLang) {
      case 'fr':
        return this.LOCALE_FR;
      default:
        return this.LOCALE_EN;
    }
  }
}
