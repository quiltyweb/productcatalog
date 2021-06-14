describe("Admin page", function(){
  it("loads login form", () => {
    cy.visit("/admin/login");
    cy.findByText("Comercial Gattoni");
    cy.findByText("Email");
    cy.findByText("Password");
    cy.findByRole("button",{ name:"Login" });
  });
});
