import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatIconRegistry } from '@angular/material';
import { materialAutocompleteConfig, materialConfig } from './material-config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { NavComponentModule } from './scam/components/shared/nav/nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSynchronizeComponentModule } from './scam/components/shared/dialog/dialog-synchronize/dialog-synchronize.component';
import { DialogConfirmComponentModule } from './scam/components/shared/dialog/dialog-confirm/dialog-confirm.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProgressBarComponentModule } from './scam/components/shared/progress-bar/progress-bar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    ProgressBarComponentModule,
    NgxPermissionsModule.forRoot(),
    NavComponentModule,
    DialogSynchronizeComponentModule,
    DialogConfirmComponentModule,
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: materialConfig,
    },
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: materialAutocompleteConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
