import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'calcapp-ngclient';
  language: string;
  constructor(private authService: AuthService,
              private translate: TranslateService){}

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
