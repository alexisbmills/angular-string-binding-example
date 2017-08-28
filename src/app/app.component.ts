import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

export interface DynamicValues {
  name: string;
  location: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dynamic: Observable<string>;

  formGroup: FormGroup;

  combined: Observable<{ html: string, values: DynamicValues }>;

  constructor(private formBuilder: FormBuilder, private http: Http) {
    this.formGroup = this.formBuilder.group({
      name: [{value: '', disabled: false}],
      location: [{value: '', disabled: false}]
    });
    const formChanges = this.formGroup.valueChanges
      .debounceTime(250)
      .distinctUntilChanged();


    const htmlFromServer = this.http.get('/api/data')
      .map((response: Response): any => response.json().html);

    this.combined = Observable
      .combineLatest(
        htmlFromServer,
        formChanges,
        (html: string, values: DynamicValues) => ({html, values})
      );

    this.dynamic = this.combined
      .map((changes: { html: string, values: DynamicValues }) => {
        let newHtml = changes.html;
        for (const key in changes.values) {
          if (changes.values.hasOwnProperty(key)) {
            newHtml = newHtml.replace(`{{values.${key}}}`, (match: string) => `<span class="highlight">${changes.values[key]}</span>`);
          }
        }
        return newHtml;
      });
  }

  initForm() {
  }

}
