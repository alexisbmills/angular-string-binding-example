
import {BaseRequestOptions, Http, RequestMethod, ResponseOptions, XHRBackend, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

export function mockBackendFactory(backend: MockBackend, requestOptions: BaseRequestOptions, realBackend: XHRBackend): Http {
  backend.connections.subscribe((connection: MockConnection) => {
    setTimeout(() => {
      const mockDataMatcher = /\/api\/data/i;

      if (connection.request.url.match(mockDataMatcher) && connection.request.method === RequestMethod.Get) {
        const options = new ResponseOptions({
          body: JSON.stringify({html: '<p>Welcome to {{location}}, {{name}}.</p>'})
        });
        connection.mockRespond(new Response(options));
        return;
      }

      const options = new ResponseOptions({
        body: JSON.stringify({}),
        status: 404
      });
      connection.mockRespond(new Response(options));
    });
  }, 500);

  return new Http(backend, requestOptions);
}
