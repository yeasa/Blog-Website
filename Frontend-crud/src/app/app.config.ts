import { ApplicationConfig, importProvidersFrom, ViewChild } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogModule,DynamicDialogRef } from 'primeng/dynamicdialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MenuItem,ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(),
    provideAnimations(),
    DynamicDialogConfig,
    DynamicDialogRef,
    DialogService,
    DynamicDialogModule,
    MessageService,
    
    ConfirmationService,
    ViewChild,
    provideHttpClient(),
    // ActivatedRoute
  ]
};
