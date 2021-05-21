import terminalLog from '../utils/terminalLog'

describe("Category page", function(){
  beforeEach(() => {
    cy.visit("/categoria/yadayadayada", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
    cy.injectAxe();
    cy.wait(1000);
  });

  describe("When page loads with incorrect category name", () => {
    it("loads error message", () => {
      cy.findByText("Se ha producido un Error, intente nuevamente haciendo click en una categoría.");
    });

    it.skip('Has no detectable a11y violations on load (custom configuration)', () => {
      cy.checkA11y(null, null, terminalLog)
    });
  });
});
