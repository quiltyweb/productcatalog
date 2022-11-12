import terminalLog from '../../utils/terminalLog'

describe("Quote page", function(){
  beforeEach(() => {
    cy.visit("/cotizacion", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
    cy.injectAxe();
  });

  describe("When page loads", () => {
    it("loads empty quote page", () => {
      cy.checkA11y(null, null, terminalLog)

      cy.findByRole("heading",{ name: "Mi Cotización:" });
      cy.findByText("No hay Productos en la Cotización.");
      cy.findByRole("link",{ name: "Click aqui para empezar a agregar productos a su cotización." });
    });
  });
});
