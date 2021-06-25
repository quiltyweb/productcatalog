describe("Admin page", function(){
  beforeEach(() => {
    cy.visit("/admin/login");
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.findByRole("button",{ name:"Login" }).click();
  });

  it("load to dashboard after login in", () => {
    cy.contains("Bienvenido/a: admin");
    cy.contains("Haga click en el menu lateral para crear, actualizar o borrar productos.");
    cy.findByText("Ver Tutoriales").closest('a').should('have.attr', 'href').and('include', '/admin/pages/Tutoriales');
    cy.findByText("Ir a Gattoni.cl").closest('a').should('have.attr', 'href').and('include', 'https://www.gattoni.cl');
    cy.findByText("Ir a Gmail").closest('a').should('have.attr', 'href').and('include', 'https://www.gmail.com');
  });


  it("loads products list with translated labels", () => {
    cy.clickMobileMenu();
    cy.findByText("Contenido").parent().click();
    cy.findByText("Productos").parent().click();
    cy.get("h2").should("contain", "Listado de Productos");
    cy.findByText("Crear nuevo Producto");
    cy.findByText("Filtrar");
    cy.get('table').within(() => {
      cy.findByText("Id");
      cy.findByText("Nombre");
      cy.findByText("Descripción");
      cy.findByText("Creación");
      cy.findByText("Actualizacón");
      cy.findByText("Imagen");
      cy.findByText("Adjunto");
    })
  });

  it("loads create new product page", () => {
    cy.clickMobileMenu();
    cy.findByText("Contenido").parent().click();
    cy.findByText("Productos").parent().click();
    cy.findByText("Crear nuevo Producto").parent().click();
    cy.get("h2").should("contain", "Crear nuevo Producto");
    cy.findByRole("button",{ name:"Guardar" });
  });

  it("loads list categories page", () => {
    cy.clickMobileMenu();
    cy.findByText("Contenido").parent().click();
    cy.findByText("Categorías").parent().click();
    cy.get("h2").should("contain", "Listado de Categorías");
    cy.findByText("Filtrar");
  });

  it("loads list users page when logged in user is ADMIN", () => {
    cy.clickMobileMenu();
    cy.findByText("Roles").parent().click();
    cy.findByText("Usuarios").parent().click();
    cy.get("h2").should("contain", "List");
    cy.get('table').within(() => {
      cy.findByText("Id");
      cy.findByText("Email");
      cy.findByText("Created At");
      cy.findByText("Updated At");
      cy.findByText("Role");
    })
    cy.findByText("Filtrar");
    cy.findByText("Create new");
  });

  it("loads estadisticas page", () => {
    cy.clickMobileMenu();
    cy.findByText("Estadisticas").parent().click();
    cy.findByText("Seccion en construccion...");
  });

  it("loads tutorials page", () => {
    cy.clickMobileMenu();
    cy.findByText("Tutoriales").parent().click();
    cy.findByText("Paso 1: ingresar al admin");
    cy.findByText("Paso 2: listar y filtrar productos");
    cy.findByText("Paso 3: agregar pdf adjunto");
    cy.findByText("Paso 4: agregar y eliminar producto");
  });
});
