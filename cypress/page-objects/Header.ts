export class Header {
	assertInventoryHeader(): this {
		cy.get('.header_label .app_logo').should('have.text', 'Swag Labs');
		return this;
	}

	assertMenuButton(): this {
		cy.get('#header_container #react-burger-menu-btn').should('be.visible');
		return this;
	}

	assertCartButton(): this {
		cy.get('.primary_header #shopping_cart_container').should('be.visible');
		return this;
	}

	assertSortContainer(): this {
		cy.get('.right_component select[class="product_sort_container"]').should(
			'be.visible'
		);
		return this;
	}

	assertSortingOptions(): this {
		// here we should click on button and put assertion on extended
		// list but because of app limitation I'll just search through DOM
		const sortingOptions = {
			nameAZ: 'az',
			nameZA: 'za',
			priceLowHigh: 'lohi',
			priceHighLow: 'hilo',
		};

		Object.values(sortingOptions).forEach((option) => {
			cy.get('.product_sort_container')
				.children(`option[value="${option}"]`)
				.should('exist');
		});

		return this;
	}
}
