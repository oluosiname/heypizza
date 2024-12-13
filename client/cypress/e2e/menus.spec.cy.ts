describe("Menu Fetch and Display", () => {
  it("fetches and displays mocked menus", () => {
    const mockData = {
      data: [
        { id: "1", attributes: { name: "Margherita", price: 9.99 } },
        { id: "2", attributes: { name: "Pepperoni", price: 10.99 } },
        { id: "3", attributes: { name: "Veggie", price: 8.99 } },
      ],
    };

    cy.intercept("GET", "/api/v1/menus", {
      statusCode: 200,
      body: mockData,
    }).as("getMenus");

    cy.visit("http://localhost:3000");

    cy.wait("@getMenus");

    cy.contains("Margherita");
    cy.contains("Veggie");
    cy.contains("Pepperoni");
  });

  it("displays no menus when the backend returns an empty list", () => {
    cy.intercept("GET", "/api/v1/menus", {
      statusCode: 200,
      body: { data: [] },
    }).as("getMenus");

    cy.visit("http://localhost:3000");

    cy.wait("@getMenus");

    cy.get(".menu-item").should("have.length", 0);
    cy.contains("No menus available matching the filter").should("be.visible");
  });
});
