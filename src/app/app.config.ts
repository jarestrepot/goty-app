import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { firebaseProviderFrom } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    importProvidersFrom(
      HttpClientModule, // Módulos main
    ),
    firebaseProviderFrom, // Firebase config
    provideAnimationsAsync() // Animaciones en el angular.
  ]
};
