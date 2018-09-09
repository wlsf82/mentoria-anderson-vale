const EC = protractor.ExpectedConditions;
const DEFAULT_TIMEOUT_IN_MS = 5000;

describe('Hackernews fake', () => {
  beforeEach(() => browser.get(''));


  xit('renders 100 items in the first visit', () => {
    const tableItems = element.all(by.css('.table .table-row'));

    browser.wait(EC.visibilityOf(tableItems.last()), DEFAULT_TIMEOUT_IN_MS, 'last table item not visible');

    expect(tableItems.count()).toBe(100);
  });

  xit('quickly shows a loading component when clicking the More button', () => {
    const moreButton = element(by.css('.interactions button[type="button"]'));
    const loading = element(by.className('loading'));

    browser.wait(EC.elementToBeClickable(moreButton), DEFAULT_TIMEOUT_IN_MS);

    moreButton.click();

    expect(loading.isDisplayed()).toBe(true);
  });

  xit('renders 200 items after clicking the More button', () => {

    element(buttonText('button')).click();

  });

  xit('quickly shows a loading component when searching for the word "react" for the first time', () => {

    const sClear = element(by.css('input[type="text"]'));
    browser.wait(EC.elementToBeClickable(sClear), DEFAULT_TIMEOUT_IN_MS);
    sClear.clear();

    const sSend = element(by.css('input[type="text"]'));
    browser.wait(EC.elementToBeClickable(sSend), DEFAULT_TIMEOUT_IN_MS);
    sSend.sendKeys('react');

    element(by.buttonText('Search')).click();

    const el = element(by.cssContainingText('div a', 'Relicensing React, Jest, Flow, and Immutable.js'));
    browser.wait(EC.elementToBeClickable(el), DEFAULT_TIMEOUT_IN_MS);

    expect(el.isDisplayed()).toBeTruthy();


  })
  xit('renders 100 items after searching for the word "react" for the first time', () => {
    // Write test logic here.
  });

  xit('does not renders a loading component after searching for "react" and then "redux" again', () => {
    
    browser.wait(EC.elementToBeClickable(sClear), DEFAULT_TIMEOUT_IN_MS);
    sClear.clear();

    const sReact = element(by.css('input[type="text"]'));
    browser.wait(EC.elementToBeClickable(sReact), DEFAULT_TIMEOUT_IN_MS);
    sReact.sendKeys('react');

    element(by.buttonText('Search')).click()

    
    browser.wait(EC.elementToBeClickable(sClear), DEFAULT_TIMEOUT_IN_MS);
    sClear.clear();

    const sRedux = element(by.css('input[type="text"]'));
    browser.wait(EC.elementToBeClickable(sRedux), DEFAULT_TIMEOUT_IN_MS);
    sRedux.sendKeys('react');

    element(by.buttonText('Search')).click()

  });

  it('shows only 99 items after dismissing one item', () => {
    const tableItems = element.all(by.css('.table .table-row'));

    browser.wait(EC.visibilityOf(tableItems.last()), DEFAULT_TIMEOUT_IN_MS, 'last table item not visible');
    element(by.buttonText('Dismiss')).click();

    expect(tableItems.count()).toBe(99);
  });
});