import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

export { LocaleService } from './locale.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class TranslationModule {
  static getLangue(): string {
    const browserLanguagePropertyKeys = [
      'language',
      'browserLanguage',
      'systemLanguage',
      'userLanguage'
    ];
    let language = 'fr';

    // support for other well known properties in browsers
    for (let i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = window.navigator[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }
    return language;
  }

  constructor(translate: TranslateService) {
    // Default language
    translate.setDefaultLang('fr');
    const language = TranslationModule.getLangue();
    translate.use(language.split('-')[0]);
  }
}
