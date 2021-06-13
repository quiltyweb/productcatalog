describe("Admin page", function(){
  beforeEach(() => {
    cy.visit("/admin/login", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
  });

  it("loads login form", () => {
    cy.findByText("Comercial Gattoni");
    cy.findByText("Email");
    cy.findByText("Password");
    cy.findByRole("button",{ name:"Login" });
  });

  it("loads dashboard", () => {
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.findByRole("button",{ name:"Login" }).click();

    cy.contains("Bienvenido/a: ");
    cy.findByText("Haga click en el menu lateral para crear, actualizar o borrar productos.");
    cy.findByText("Ir a Gattoni.cl");
    cy.findByText("Ir a Gmail");
  });

  it("loads products list with translated labels", () => {
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.findByRole("button",{ name:"Login" }).click();
    // hamburger menu:
    cy.get('.admin-bro_NavBar > .admin-bro_Box > span > svg').click();
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
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.findByRole("button",{ name:"Login" }).click();
    // hamburger menu:
    cy.get('.admin-bro_NavBar > .admin-bro_Box > span > svg').click();
    cy.findByText("Contenido").parent().click();
    cy.findByText("Productos").parent().click();
    cy.findByText("Crear nuevo Producto").parent().click();
    cy.get("h2").should("contain", "Crear nuevo Producto");
    cy.findByRole("button",{ name:"Guardar" });
  });

  it("loads list categories page", () => {
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.findByRole("button",{ name:"Login" }).click();
    // hamburger menu:
    cy.get('.admin-bro_NavBar > .admin-bro_Box > span > svg').click();
    cy.findByText("Contenido").parent().click();
    cy.findByText("Categorías").parent().click();
    cy.get("h2").should("contain", "Listado de Categorías");
    cy.findByText("Filtrar");
  });

  it("loads list users page", () => {
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.findByRole("button",{ name:"Login" }).click();
    // hamburger menu:
    cy.get('.admin-bro_NavBar > .admin-bro_Box > span > svg').click();
    cy.findByText("Roles").parent().click();
    cy.findByText("Usuarios").parent().click();
    cy.get("h2").should("contain", "List");
    cy.get('table').within(() => {
      cy.findByText("Id");
      cy.findByText("Email");
      cy.findByText("Created At");
      cy.findByText("Updated At");
    })
    cy.findByText("Filtrar");
  });

  it("loads estadisticas page", () => {
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.findByRole("button",{ name:"Login" }).click();
    // hamburger menu:
    cy.get('.admin-bro_NavBar > .admin-bro_Box > span > svg').click();
    cy.findByText("Estadisticas").parent().click();
    cy.findByText("Estadisticas Proximamente...");
  });
});
