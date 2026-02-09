/// <reference types="cypress" />

describe("Scroll Navigation", () => {
  it("should scroll to top on site navigation", () => {
    cy.visit("/");
    cy.get("#assignment-BADITT > .flex-col > a").scrollIntoView().should("be.visible").click().click(); // somehow needs two clicks here??

    cy.location("pathname").should(
      "eq",
      "/assignments/BADITT/Quality-4.0-Untersuchung-von-Herausforderungen-bei-der-Implementierung-von-Quality-4.0-in-kleinen-und-mittleren-Unternehmen-am-Beispiel-einer-Fallstudie-aus-der-Fertigungsindustrie-(Expos%C3%A9)",
    );

    cy.window().its("scrollY").should("equal", 0);
  });
});

export {};
