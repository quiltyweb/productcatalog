import terminalLog from '../utils/terminalLog'

describe("404 page", function(){
  beforeEach(() => {
    cy.visit("/something-not-found", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
    cy.injectAxe()
  });

  describe("When page loads", () => {
    it("loads message not found", () => {
      cy.findByRole("heading", { name: "Página no encontrada (error 404)" });
    });

    it('Has no detectable a11y violations on load (custom configuration)', () => {
      cy.checkA11y(null, null, terminalLog)
    })
  });
});
