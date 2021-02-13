import terminalLog from '../utils/terminalLog'

describe("HomePage", function(){
  beforeEach(() => {
    cy.visit("/", { headers: { Connection: "Keep-Alive" } });
    cy.injectAxe()
    cy.wait(1000);
  });

  describe("When page loads", () => {
    it("loads navigation menu", () => {
      cy.findByRole("navigation").within(() => {
        cy.findByRole("heading", { name: "GATTONI Seguridad Industrial" });
          cy.findAllByRole("listitem").should('have.length', 3);
          cy.findByRole("link", { name: "Productos" });
          cy.findByRole("link", { name: "Contacto" });
          cy.findByRole("link", { name: "Mi Cotización" });
          cy.findByRole("searchbox").type("casco minero").should("have.value","casco minero" )
          cy.findByRole("button", { name: "Buscar" });
      })
    });

    it("loads a grid with categories", () => {
      cy.findByRole("main").within(()=>{
        cy.findByRole("heading", {name:"Nuestros Productos"}).should('exist');
        cy.findAllByRole("listitem").should('have.length', 12);
      });
    });

    it("loads a footer with correct headings", () => {
      cy.findByRole("contentinfo").within(()=>{
        cy.findByRole("heading", {name:"Somos seguridad industrial en Atacama."}).should('exist')
        cy.findByRole("heading", {name:"Contáctenos"}).should('exist')
        cy.findByRole("heading", {name:"Horario de atención"}).should('exist')
        cy.findByAltText("comercialgattoni arroba gattoni punto cl").should('exist')
      });
    });
  });

  describe("When user types a search term in searchbox", () => {
    it("loads search results page", () => {
      cy.findByRole("searchbox").type("casco")
      cy.findByRole("button", {name: "Buscar"}).click()
      cy.findByRole("heading",{name:'Resultados para: "casco"'})
    })
  })

  describe("When user clicks on product menu item", () => {
    it("loads products page", () => {
      cy.findByRole("navigation").within(() => {
        cy.findByRole("link", { name: "Productos" }).click();
      })
      cy.findByRole("heading",{name:"Categoría: Soldador"})
    })
  })

  describe("When user clicks on contact menu item", () => {
    it("loads Contact page", () => {
      cy.findByRole("navigation").within(() => {
        cy.findByRole("link", { name: "Contacto" }).click();
      })
      cy.findByRole("main").within(() => {
        cy.findByRole("heading",{name:"Ingrese su consulta"})
        cy.findByText("También puede contactarnos vía nuestro fono ventas llamando al:")
        cy.findByText("(52) 2 218056")
        cy.findByLabelText("Nombre");
         cy.findByLabelText("Empresa");
         cy.findByLabelText("E-mail");
         cy.findByLabelText("Telefono");
         cy.findByLabelText("Consulta");
         cy.findByText("Click en el botón para verificar antispam:");
         cy.findByRole("button", { name: "Submit" });
         cy.findByRole("button", { name: "Cancel" });
      })
     })
  })

  describe("When user clicks on Quote menu item", () => {
    it("loads Quote page", () => {
      cy.findByRole("navigation").within(() => {
        cy.findByRole("link", { name: "Mi Cotización" }).click();
      })
      cy.findByRole("main").within(() => {
        cy.findByRole("heading",{name:"Mi Cotización:"})
      })
     })
  })

  it('Has no detectable a11y violations on load (custom configuration)', () => {
    cy.checkA11y(null, null, terminalLog)
  })
});
