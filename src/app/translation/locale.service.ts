import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LocaleService {

  private LOCALE_FR = 'fr';
  private LOCALE_EN = 'en';

  constructor(private translateService: TranslateService) {
  }

  getLocal(): string {
    switch (this.translateService.currentLang) {
      case 'fr':
        return this.LOCALE_FR;
      default:
        return this.LOCALE_EN;
    }
  }
}
