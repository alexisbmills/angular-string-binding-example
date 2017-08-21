import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MdInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseRequestOptions, Http, HttpModule, XHRBackend} from '@angular/http';

import {AppComponent} from './app.component';
import {MockBackend} from '@angular/http/testing';
import {mockBackendFactory} from './mock-backend.factory';
import {FeSafeHtmlPipe} from './safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FeSafeHtmlPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    MdInputModule
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
