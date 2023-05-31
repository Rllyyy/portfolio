/// <reference types="cypress" />

import { Navbar } from ".";
import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";
import Home from "pages";

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

  it("should expand the navbar when the scroll position at the top of the page ", () => {
    cy.mount(
      <>
        <ThemeProvider enableSystem={false} attribute='class'>
          <Navbar />
          <Home />
        </ThemeProvider>
      </>
    );

    cy.get("nav").invoke("outerHeight").should("be.greaterThan", 90);
  });

  it("should reduce the height of the navbar if scrolling down ", () => {
    cy.mount(
      <>
        <ThemeProvider enableSystem={false} attribute='class'>
          <Navbar />
          <Home />
        </ThemeProvider>
      </>
    );

    cy.scrollTo(0, 100);
    cy.wait(0);

    cy.get("nav").invoke("outerHeight").should("be.lessThan", 60);
  });

  it("should show the menuitems on mobile on menu burger click", () => {
    cy.mount(<MockNavbarWithTheme />);
    cy.get("button[aria-label='Show navigation']").click();

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("be.visible");
      cy.contains("li", "Projects").should("be.visible");
      cy.contains("li", "Skills").should("be.visible");
      cy.contains("li", "Contact").should("be.visible");
    });
  });

  it("should hide the menuitems on mobile on menu burger click again", () => {
    cy.mount(<MockNavbarWithTheme />);
    cy.get("button[aria-label='Show navigation']").click();
    cy.get("button[aria-label='Hide navigation']").click();

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("not.be.visible");
      cy.contains("li", "Projects").should("not.be.visible");
      cy.contains("li", "Skills").should("not.be.visible");
      cy.contains("li", "Contact").should("not.be.visible");
    });
  });

  it("should display the navigation on desktop", () => {
    cy.viewport(850, 500);
    cy.mount(<MockNavbarWithTheme />);

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("be.visible");
      cy.contains("li", "Projects").should("be.visible");
      cy.contains("li", "Skills").should("be.visible");
      cy.contains("li", "Contact").should("be.visible");
    });
  });

  it("should not display the navigation on mobile", () => {
    cy.viewport(500, 500);
    cy.mount(<MockNavbarWithTheme />);

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("not.be.visible");
      cy.contains("li", "Projects").should("not.be.visible");
      cy.contains("li", "Skills").should("not.be.visible");
      cy.contains("li", "Contact").should("not.be.visible");
    });
  });

  it("should show the navigation if increasing the viewport from mobile size to desktop size", () => {
    cy.viewport(500, 500);
    cy.mount(<MockNavbarWithTheme />);

    cy.viewport(850, 500);

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("be.visible");
      cy.contains("li", "Projects").should("be.visible");
      cy.contains("li", "Skills").should("be.visible");
      cy.contains("li", "Contact").should("be.visible");
    });
  });

  it("should navigate to projects if clicking on Projects in navbar", () => {
    cy.viewport(850, 500);
    cy.mount(
      <>
        <ThemeProvider enableSystem={false} attribute='class'>
          <Navbar />
          <Home />
        </ThemeProvider>
      </>
    );
    cy.contains("a", "Projects").click();

    cy.contains("h2", "Projects").should("be.visible");
  });

  it("should navigate to skills if clicking on Skills in the navbar", () => {
    cy.viewport(850, 500);
    cy.mount(
      <>
        <ThemeProvider enableSystem={false} attribute='class'>
          <Navbar />
          <Home />
        </ThemeProvider>
      </>
    );
    cy.contains("a", "Skills").click();

    cy.contains("h2", "Skills").should("be.visible");
  });

  it("should scroll to top if clicking on Home in the navbar", () => {
    cy.viewport(850, 500);
    cy.mount(
      <>
        <ThemeProvider enableSystem={false} attribute='class'>
          <Navbar />
          <Home />
        </ThemeProvider>
      </>
    );

    cy.scrollTo(0, 300, { duration: 0 }).then(() => {
      cy.wait(100);
      cy.contains("a", "Home")
        .click()
        .then(() => {
          cy.wait(300);
          cy.window().then(($window) => {
            //cy.wait(1000);
            expect($window.scrollY).to.eq(0);
          });
        });
    });
  });
});
