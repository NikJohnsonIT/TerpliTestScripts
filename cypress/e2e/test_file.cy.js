import 'cypress-iframe';

describe('Terpli Vendor Website Testing', () => {

const urls = ['https://demo.terpli.io?hwcannabis.co', 'https://demo.terpli.io?traderoots.buzz', 'https://demo.terpli.io?livewithsol.com'];

        urls.forEach(url => {
            it(`should verify Terpli launcher icon on ${url}`, () => {
                cy.visit(url);
                //Bonus Criteria:Test retailer's multiple locations as appropriate.
                //Identify dropdown, retrieve options.
                cy.get('#demo_retailer_select').then($dropdown => {
                //If more than 1 location option, loop
                if ($dropdown.find('option').length > 1) {
                    const locations = $dropdown.find('option').map((index, el) => el.value).get();
                    //Loop through each location in dropdown
                    locations.forEach(location => {
                    //Change the location dropdown selection.
                    cy.get('#demo_retailer_select').select(location);
                    //Change the side dropdown selection.
                    ['Right', 'Left'].forEach(side => {
                    cy.get('#demo_side_select').select(side);
                    //Wait for page to update after Right/Left selection.
                    cy.get('#terpli_floating').should('have.class', `terpli_${side.toLowerCase()}`);
                    //Test for Terpli launcher presence and functionality.
                    cy.get('#terpli_launcher_button').should('exist');
                    //Click the launcher button.
                    cy.get('#terpli_launcher_button').click();
                    //Check for iframe inside the terpli_floating, this indicates the tool launches.
                    cy.get('#terpli_floating iframe').should('have.class', 'visible');
                    //Click the launcher icon again to ensure no obstructions of page content.
                    cy.get('#terpli_launcher_button').should('exist').click();
                    });
                });
            } else {
                    ['Right', 'Left'].forEach(side => {
                    cy.get('#demo_side_select').select(side);
                    //Wait for page to update after Right/Left selection.
                    cy.get('#terpli_floating').should('have.class', `terpli_${side.toLowerCase()}`);
                    //Test for Terpli launcher presence and functionality.
                    cy.get('#terpli_launcher_button').should('exist');
                    //Click the launcher button.
                    cy.get('#terpli_launcher_button').click();
                    //Check for iframe inside the terpli_floating, this indicates the tool launches.
                    cy.get('#terpli_floating iframe').should('have.class', 'visible');
                    //Click the launcher icon again to ensure no obstructions of page content.
                    cy.get('#terpli_launcher_button').should('exist').click();
                    });
                  }
               });
            });
         });
});