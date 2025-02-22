/// <reference types="cypress" />

import { Assignments } from ".";

import "@/app/globals.css";

describe("<Assignments />", () => {
  it("should render assignments", () => {
    cy.mount(<Assignments />);
    cy.get("article").should("have.length", 12);
  });

  it("should have the correct time value and attribute", () => {
    cy.mount(<Assignments />);
    cy.get("#assignment-ANS43").find("time").should("have.text", "Nov 2021");
    cy.get("#assignment-ANS43").find("time").should("have.attr", "datetime", "2021-11-14");
  });
});
