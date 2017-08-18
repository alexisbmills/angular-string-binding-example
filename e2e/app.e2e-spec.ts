import { AngularDynamicStringPage } from './app.po';

describe('angular-dynamic-string App', () => {
  let page: AngularDynamicStringPage;

  beforeEach(() => {
    page = new AngularDynamicStringPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
