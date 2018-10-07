// After refactoring all tests to use the protractor-helepr library the below two lines will not be needed anymore.
const EC = protractor.ExpectedConditions;
const DEFAULT_TIMEOUT_IN_MS = 5000;

const helper = require('protractor-helper');

const SamplePage = require('../page-objects/sample.po');

describe('Hackernews fake', () => {
  const samplePage = new SamplePage();

  beforeEach(() => browser.get(samplePage.relativeUrl));

  it('renders 100 items in the first visit', () => {
    helper.waitForElementVisibility(samplePage.tableItems.last());

    expect(samplePage.tableItems.count()).toBe(100);
  });

  it('quickly shows a loading component when clicking the More button', () => {
    helper.clickWhenClickable(samplePage.moreButton);

    expect(samplePage.loading.isDisplayed()).toBe(true);
  });

  it('renders 200 items after clicking the More button', () => {
    helper.clickWhenClickable(samplePage.moreButton);

    helper.waitForElementVisibility(samplePage.loading);
    helper.waitForElementNotToBePresent(samplePage.loading);

    helper.waitForElementVisibility(samplePage.tableItems.last());

    expect(samplePage.tableItems.count()).toBe(200);
  });

  it('quickly shows a loading component when searching for the word "react" for the first time', () => {
    const searchField = element(by.css('input[type="text"]'));
    const searchButton = element(by.css('button[type="submit"]'));
    const loading = element(by.className('loading'));

    browser.wait(EC.visibilityOf(searchField), DEFAULT_TIMEOUT_IN_MS);
    browser.wait(EC.elementToBeClickable(searchButton), DEFAULT_TIMEOUT_IN_MS);

    searchField.clear();
    searchField.sendKeys('react');
    searchButton.click();

    browser.wait(EC.visibilityOf(loading), DEFAULT_TIMEOUT_IN_MS);
  })
  it('renders 100 items after searching for the word "react" for the first time', () => {
    const searchField = element(by.css('input[type="text"]'));
    const searchButton = element(by.css('button[type="submit"]'));
    const loading = element(by.className('loading'));

    browser.wait(EC.visibilityOf(searchField), DEFAULT_TIMEOUT_IN_MS);
    browser.wait(EC.elementToBeClickable(searchButton), DEFAULT_TIMEOUT_IN_MS);

    searchField.clear();
    searchField.sendKeys('react');
    searchButton.click();

    browser.wait(EC.visibilityOf(loading), DEFAULT_TIMEOUT_IN_MS);
    browser.wait(EC.stalenessOf(loading), DEFAULT_TIMEOUT_IN_MS);

    const tableItems = element.all(by.css('.table .table-row'));

    browser.wait(EC.visibilityOf(tableItems.last()), DEFAULT_TIMEOUT_IN_MS);

    expect(tableItems.count()).toBe(100);
  });

  it('does not renders a loading component after searching for "react" and then "redux" again', () => {
    const searchField = element(by.css('input[type="text"]'));
    const searchButton = element(by.css('button[type="submit"]'));
    const loading = element(by.className('loading'));

    browser.wait(EC.visibilityOf(searchField), DEFAULT_TIMEOUT_IN_MS);
    browser.wait(EC.elementToBeClickable(searchButton), DEFAULT_TIMEOUT_IN_MS);

    searchField.clear();
    searchField.sendKeys('react');
    searchButton.click();

    browser.wait(EC.visibilityOf(loading), DEFAULT_TIMEOUT_IN_MS);
    browser.wait(EC.stalenessOf(loading), DEFAULT_TIMEOUT_IN_MS);

    searchField.clear();
    searchField.sendKeys('redux');
    searchButton.click();

    browser.wait(EC.stalenessOf(loading), DEFAULT_TIMEOUT_IN_MS);
  });

  it('shows only 99 items after dismissing one item', () => {
    const tableItems = element.all(by.css('.table .table-row'));
    const dismissButtonOfFirstItem = element.all(by.css('.table-row .button-inline')).first();

    browser.wait(EC.visibilityOf(tableItems.last()), DEFAULT_TIMEOUT_IN_MS, 'last table item not visible');
    dismissButtonOfFirstItem.click();

    expect(tableItems.count()).toBe(99);
  });

  it('renders no item when searching for an unknown term', () => {
    const tableItems = element.all(by.css('.table .table-row'));
    const searchButton = element(by.css('button[type="submit"]'));
    const searchField = element(by.css('input[type="text"]'));
    const loading = element(by.className('loading'));

    helper.waitForElementVisibility(tableItems.last());
    
    searchField.clear();
    searchField.sendKeys('tiruliro');
    searchButton.click();

    helper.waitForElementVisibility(loading);
    helper.waitForElementNotToBePresent(loading);

    expect(tableItems.count()).toBe(0);

  });
});