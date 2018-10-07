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
    helper.clearFieldWhenVisibleAndFillItWithText(samplePage.searchField, 'react');
    helper.clickWhenClickable(samplePage.searchButton);

    helper.waitForElementVisibility(samplePage.loading);
  })
  it('renders 100 items after searching for the word "react" for the first time', () => {
    helper.clearFieldWhenVisibleAndFillItWithText(samplePage.searchField, 'react');
    helper.clickWhenClickable(samplePage.searchButton);

    helper.waitForElementVisibility(samplePage.loading);
    helper.waitForElementNotToBePresent(samplePage.loading);

    helper.waitForElementVisibility(samplePage.tableItems.last());

    expect(samplePage.tableItems.count()).toBe(100);
  });

  it('does not renders a loading component after searching for "react" and then "redux" again', () => {
    helper.clearFieldWhenVisibleAndFillItWithText(samplePage.searchField, 'react');
    helper.clickWhenClickable(samplePage.searchButton);

    helper.waitForElementVisibility(samplePage.loading);
    helper.waitForElementNotToBePresent(samplePage.loading);

    helper.clearFieldWhenVisibleAndFillItWithText(samplePage.searchField, 'redux');
    helper.clickWhenClickable(samplePage.searchButton);

    helper.waitForElementNotToBePresent(samplePage.loading);
  });

  it('shows only 99 items after dismissing one item', () => {
    helper.waitForElementVisibility(samplePage.tableItems.last());

    helper.clickWhenClickable(samplePage.dismissButtonOfFirstItem);

    expect(samplePage.tableItems.count()).toBe(99);
  });

  it('renders no item when searching for an unknown term', () => {
    helper.clearFieldWhenVisibleAndFillItWithText(samplePage.searchField, 'tiruliro');
    helper.clickWhenClickable(samplePage.searchButton);

    helper.waitForElementVisibility(samplePage.loading);
    helper.waitForElementNotToBePresent(samplePage.loading);

    expect(samplePage.tableItems.count()).toBe(0);
  });
});