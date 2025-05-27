/// <reference types="cypress" />

import { Assignments } from ".";

import "@/app/globals.css";

describe("<Assignments />", () => {
  it("should render assignments", async () => {
    const component = await Assignments();
    cy.mount(component);
    cy.get("article").should("have.length", 13);
  });

  it("should have the correct time value and attribute", async () => {
    const component = await Assignments();
    cy.mount(component);
    cy.get("#assignment-ANS43").find("time").should("have.text", "Nov 2021");
    cy.get("#assignment-ANS43").find("time").should("have.attr", "datetime", "2021-11-14");
  });
});
