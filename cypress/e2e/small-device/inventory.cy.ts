import { Footer } from '../../page-objects/Footer';
import { Header } from '../../page-objects/Header';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { credentials } from '../../support/credentials';
import { setViewport, viewports } from '../../support/viewports';

describe('Inventory tests', () => {
  const inventoryPage = new InventoryPage();
  const header = new Header();
  const footer = new Footer();

  context('Small device', () => {
    const username = credentials.username[0];

    beforeEach('Login and navigate to inventory page', () => {
      setViewport(viewports.small);
      cy.setCookie('session-username', username);
      inventoryPage.visit();
    });

    it('[INV-7] Should verify inventory content', () => {
      header
        .assertInventoryHeader()
        .assertMenuButton()
        .assertCartButton()
        .assertSortContainer()
        .assertSortingOptions();

      inventoryPage
        .assertInventoryContainerVisible()
        .assertInventoryItemsVisible()
        .assertInventoryItemsContent();

      footer
        .assertFooterVisible()
        .assertSocialMediaLogo()
        .assertCopyrightsText();
    });

    it('[INV-8] Should verify sorting by name', () => {
      const sortingOptions = {
        nameAZ: 'Name (A to Z)',
        nameZA: 'Name (Z to A)',
      };

      header.assertSortingOptions();

      Object.values(sortingOptions).forEach((option) => {
        header.sortInventoryItems(option);

        cy.get('.inventory_item_name').then((items) => {
          const originalNames = items
            .map((index, element) => Cypress.$(element).text())
            .get();
          const sortedNames = [...originalNames].sort();
          const descendingSortedNames = [...originalNames].sort().reverse();

          option === sortingOptions.nameAZ
            ? expect(originalNames).to.deep.equal(sortedNames)
            : expect(originalNames).to.deep.equal(descendingSortedNames);
        });
      });
    });

    it('[INV-9] Should verify sorting by price', () => {
      const sortingOptions = {
        priceLowHigh: 'Price (low to high)',
        priceHighLow: 'Price (high to low)',
      };

      header.assertSortingOptions();

      Object.values(sortingOptions).forEach((option) => {
        header.sortInventoryItems(option);

        cy.get('.inventory_item_price').then((items) => {
          const originalPrices = items
            .map((index, element) => Cypress.$(element).text().replace('$', ''))
            .get();
          const sortedNames = [...originalPrices].sort(
            (a, b) => parseFloat(a) - parseFloat(b),
          );
          const descendingSortedNames = [...originalPrices].sort(
            (a, b) => parseFloat(b) - parseFloat(a),
          );

          option === sortingOptions.priceLowHigh
            ? expect(originalPrices).to.deep.equal(sortedNames)
            : expect(originalPrices).to.deep.equal(descendingSortedNames);
        });
      });
    });
  });
});
