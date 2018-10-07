class SamplePage {
  constructor() {
    this.relativeUrl = '';

    this.tableItems = element.all(by.css('.table .table-row'));
    this.moreButton = element(by.css('.interactions button[type="button"]'));
    this.loading = element(by.className('loading'));
  }
}

module.exports = SamplePage;