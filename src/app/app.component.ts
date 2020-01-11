import { AuthService } from "./auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "calcapp-ngclient";
  language: string;
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private updates: SwUpdate
  ) {
    updates.available.subscribe(event => {
      console.log(event);
      if (confirm("New version available. Load New Version?")) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }

  ngOnInit(): void {
    this.language = "en";
    this.authService.autoLogin();
  }

  changerLanguage(language: string) {
    this.translate.use(language).subscribe(() => {
      this.language = language;
    });
  }
}
