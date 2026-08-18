import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OverlayModule } from '@angular/cdk/overlay'; // اضافه کردن
import { PortalModule } from '@angular/cdk/portal';   // اضافه کردن
import { authInterceptor } from './core/interceptors/auth-interceptor';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    importProvidersFrom(OverlayModule, PortalModule), // <-- اضافه کنید

    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }), provideClientHydration(withEventReplay()),

  ]
};
