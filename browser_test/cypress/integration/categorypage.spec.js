import terminalLog from '../utils/terminalLog'

describe("Category page", function(){
  describe("When a product category item is selected", () => {
    it("loads product items of selected category", () => {
      cy.visit("/", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
      cy.wait(1000);
      cy.findByRole("main").within(()=> {
        cy.get('a').eq(1).click();
      })

      cy.findAllByRole("link", { name: "ver producto" });
      cy.findAllByRole("button", { name: "Agregar a cotización" });
    });

    it.skip('Has no detectable a11y violations on load (custom configuration)', () => {
      cy.visit("/", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
      cy.injectAxe();
      cy.wait(1000);
      cy.findByRole("main").within(()=> {
        cy.get('a').eq(1).click();
      })
      cy.findAllByRole("link", { name: "ver producto" });
      cy.checkA11y(null, null, terminalLog)
    });
  });

  describe("When page loads with incorrect category name", () => {
    it("loads error message", () => {
      cy.visit("/categoria/yadayadayada", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
      cy.findByText("Se ha producido un Error, intente nuevamente haciendo click en una categoría.");
    });
  });
});
