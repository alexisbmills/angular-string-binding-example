import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class FeSafeHtmlPipe implements PipeTransform {

  /**
   * Consider security implications
   *
   * @see https://angular.io/docs/ts/latest/guide/security.html#!#xss
   *
   * @param sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Transform HTML
   *
   * @param value
   * @param args
   * @returns {any}
   */
  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
