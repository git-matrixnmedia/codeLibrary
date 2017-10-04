import { ImageEditPage } from './app.po';

describe('image-edit App', () => {
  let page: ImageEditPage;

  beforeEach(() => {
    page = new ImageEditPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
