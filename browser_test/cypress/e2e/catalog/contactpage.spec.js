import terminalLog from '../../utils/terminalLog'

describe("Contact", function(){
  beforeEach(() => {
    cy.visit("/contacto", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
    cy.injectAxe();
  });

  describe("When page loads", () => {
    it("loads contact form", () => {
      cy.checkA11y(null, null, terminalLog)

      cy.findByLabelText("Nombre");
      cy.findByLabelText("Empresa");
      cy.findByLabelText("E-mail");
      cy.findByLabelText("Telefono");
      cy.findByLabelText("Consulta");
      cy.findByText("Click en el botón para verificar antispam:");
      cy.findByRole("button", { name: "No soy robot!" });
      cy.findByRole("button", { name: "Cancel" });
      cy.findByRole("button", { name: "Submit" });
    });
  });
});
