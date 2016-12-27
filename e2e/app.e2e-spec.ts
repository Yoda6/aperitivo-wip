import { AperitivoPage } from './app.po';

describe('aperitivo App', function() {
  let page: AperitivoPage;

  beforeEach(() => {
    page = new AperitivoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
