/// <reference types="cypress" />

describe("Homepage", () => {
  it("should display landing page on visit", () => {
    cy.visit("/");
    cy.contains("Developing Solutions").should("exist");
  });

  it("should scroll to projects if clicking on 'View Projects'", { scrollBehavior: false }, () => {
    cy.visit("/");
    cy.get("a[href='#projects']").click();
    cy.contains("h2", "Projects").should("exist");
  });
});

export {};
