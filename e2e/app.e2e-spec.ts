import { AngularTaskManagerPage } from './app.po';

describe('angular-task-manager App', () => {
  let page: AngularTaskManagerPage;

  beforeEach(() => {
    page = new AngularTaskManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
