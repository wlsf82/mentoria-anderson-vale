class SamplePage {
  constructor() {
    this.relativeUrl = '';

    this.tableItems = element.all(by.css('.table .table-row'));
    this.moreButton = element(by.css('.interactions button[type="button"]'));
    this.loading = element(by.className('loading'));
    this.searchField = element(by.css('input[type="text"]'));
    this.searchButton = element(by.css('button[type="submit"]'));
    this.dismissButtonOfFirstItem = element.all(by.css('.table-row .button-inline')).first();

  }
}

module.exports = SamplePage;