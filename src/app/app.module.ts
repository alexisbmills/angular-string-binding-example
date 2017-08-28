import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MdButtonModule, MdInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseRequestOptions, Http, HttpModule, XHRBackend} from '@angular/http';

import {AppComponent} from './app.component';
import {MockBackend} from '@angular/http/testing';
import {mockBackendFactory} from './mock-backend.factory';
import {FeSafeHtmlPipe} from './safe-html.pipe';
import { HtmlOutletDirective } from './html-outlet.directive';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FeSafeHtmlPipe,
    HtmlOutletDirective
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: AppComponent}]),
    MdInputModule,
    MdButtonModule
  ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    XHRBackend,
    {
      provide: Http,
      useFactory: mockBackendFactory,
      deps: [MockBackend, BaseRequestOptions, XHRBackend]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
