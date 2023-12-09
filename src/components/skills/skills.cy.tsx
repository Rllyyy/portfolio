/// <reference types="cypress" />

import { Skills } from ".";
import { ThemeProvider } from "next-themes";

import "@/app/globals.css";

const MockSkillsWithTheme = () => {
  return (
    <>
      <ThemeProvider enableSystem={false} attribute='class'>
        <Skills />
      </ThemeProvider>
    </>
  );
};

describe("<Skills />", () => {
  it("should render 9 skills", () => {
    cy.mount(<MockSkillsWithTheme />);
    cy.get("article").should("have.length", 9);
  });

  it("should round the the top corners of the first element and the bottom corners of the last element on mobile", () => {
    cy.viewport(500, 500);
    cy.mount(<MockSkillsWithTheme />);

    // Assert that the first element has the more rounded corners at the top
    cy.get("article").first().should("have.css", "border-top-left-radius", "12px");
    cy.get("article").first().should("have.css", "border-top-right-radius", "12px");
    cy.get("article").first().should("have.css", "border-bottom-right-radius", "4px");
    cy.get("article").first().should("have.css", "border-bottom-left-radius", "4px");

    // Assert that the last element has the more rounded corners at the bottom
    cy.get("article").last().should("have.css", "border-bottom-left-radius", "12px");
    cy.get("article").last().should("have.css", "border-bottom-right-radius", "12px");
    cy.get("article").last().should("have.css", "border-top-left-radius", "4px");
    cy.get("article").last().should("have.css", "border-top-right-radius", "4px");

    cy.get("article").eq(1).should("have.css", "border-radius", "4px");
  });

  it("should round the correct elements on md viewport", () => {
    cy.viewport(768, 500);
    cy.mount(<MockSkillsWithTheme />);

    // Assert that the first element has the more rounded corners at the top left
    cy.get("article")
      .first()
      .should("have.css", "border-top-left-radius", "12px")
      .and("have.css", "border-top-right-radius", "4px")
      .and("have.css", "border-bottom-left-radius", "4px")
      .and("have.css", "border-bottom-right-radius", "4px");

    cy.get("article")
      .eq(1)
      .should("have.css", "border-top-left-radius", "4px")
      .and("have.css", "border-top-right-radius", "12px")
      .and("have.css", "border-bottom-left-radius", "4px")
      .and("have.css", "border-bottom-right-radius", "4px");

    // Assert that the second element has the more rounded corners at the top right only
    cy.get("article").eq(2).should("have.css", "border-radius", "4px");

    // Assert that the last element  has the more rounded corners at the bottom left only
    cy.get("article")
      .last()
      .should("have.css", "border-top-left-radius", "4px")
      .and("have.css", "border-top-right-radius", "4px")
      .and("have.css", "border-bottom-left-radius", "12px")
      .and("have.css", "border-bottom-right-radius", "4px");
  });

  it("should round the correct elements on lg viewport", () => {
    cy.viewport(1024, 500);
    cy.mount(<MockSkillsWithTheme />);

    // Assert that the first element has the more rounded corners at the top left
    cy.get("article")
      .first()
      .should("have.css", "border-top-left-radius", "12px")
      .and("have.css", "border-top-right-radius", "4px")
      .and("have.css", "border-bottom-left-radius", "4px")
      .and("have.css", "border-bottom-right-radius", "4px");

    cy.get("article")
      .eq(2)
      .should("have.css", "border-top-left-radius", "4px")
      .and("have.css", "border-top-right-radius", "12px")
      .and("have.css", "border-bottom-left-radius", "4px")
      .and("have.css", "border-bottom-right-radius", "4px");

    // Assert that the second element has the more rounded corners at the top right only
    cy.get("article").eq(1).should("have.css", "border-radius", "4px");

    // Assert that the last element  has the more rounded corners at the bottom left only
    cy.get("article")
      .eq(6)
      .should("have.css", "border-top-left-radius", "4px")
      .and("have.css", "border-top-right-radius", "4px")
      .and("have.css", "border-bottom-left-radius", "12px")
      .and("have.css", "border-bottom-right-radius", "4px");

    // Assert that the last element  has the more rounded corners at the bottom left only
    cy.get("article")
      .last()
      .should("have.css", "border-top-left-radius", "4px")
      .and("have.css", "border-top-right-radius", "4px")
      .and("have.css", "border-bottom-left-radius", "4px")
      .and("have.css", "border-bottom-right-radius", "12px");
  });
});
