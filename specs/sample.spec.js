const EC = protractor.ExpectedConditions;
const DEFAULT_TIMEOUT_IN_MS = 5000;

describe('Hackernews fake', () => {
    beforeEach(() => browser.get(''));

    it('renders 100 items in the first visit', () => {
        const tableItems = element.all(by.css('.table .table-row'));

        browser.wait(EC.visibilityOf(tableItems.last()), DEFAULT_TIMEOUT_IN_MS, 'last table item not visible');

        expect(tableItems.count()).toBe(100);
    });

    it('quickly shows a loading component when clicking the More button', () => {
        const moreButton = element(by.css('.interactions button[type="button"]'));
        const loading = element(by.className('loading'));

        browser.wait(EC.elementToBeClickable(moreButton), DEFAULT_TIMEOUT_IN_MS);

        moreButton.click();

        expect(loading.isDisplayed()).toBe(true);
      });
});