describe("Product page", function(){
  describe("When a product item is selected", () => {
    it("loads the product item", () => {
      cy.visit("/", { headers: { Connection: "Keep-Alive" }, responseTimeout: 31000 });
      cy.findByRole("main").within(()=> {
        cy.get('a').eq(1).click();
      })

      cy.findAllByRole("link", { name: "ver producto" }).first().click();
      cy.findByRole("button", { name: "Agregar a cotización" });
    });
  })
});
