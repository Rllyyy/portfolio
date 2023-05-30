/// <reference types="cypress" />

import { Navbar } from ".";
import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";

const MockNavbarWithTheme = () => {
  return (
    <ThemeProvider enableSystem={false} attribute='class'>
      <Navbar />
    </ThemeProvider>
  );
};

describe("<Navbar />", () => {
  it("should change the color theme to dark on click", () => {
    cy.mount(<MockNavbarWithTheme />);
    cy.get("button[aria-label='Use dark mode']")
      .click()
      .should(() => {
        expect(localStorage.getItem("theme")).to.eq("dark");
      });

    cy.get("html.dark").should("exist").and("have.attr", "style", "color-scheme: dark;");
  });

  it("should change the color theme to light on click", () => {
    cy.mount(<MockNavbarWithTheme />);
    cy.get("button[aria-label='Use dark mode']").click();
    cy.get("button[aria-label='Use light mode']")
      .click()
      .should(() => {
        expect(localStorage.getItem("theme")).to.eq("light");
      });

    cy.get("html.light").should("exist").and("have.attr", "style", "color-scheme: light;");
  });
});
