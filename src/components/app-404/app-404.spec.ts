import { TestWindow } from '@stencil/core/testing';
import { App_404 } from './app-404';

describe('app-404', () => {
  it('should build', () => {
    expect(new App_404()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLApp_404Element;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [App_404],
        html: '<app-404></app-404>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
