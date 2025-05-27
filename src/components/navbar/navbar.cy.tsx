/// <reference types="cypress" />

import { Navbar } from ".";
import { ThemeProvider } from "next-themes";

import "@/app/globals.css";
import { LandingPage } from "../landingPage";
import { Profile } from "../profile";
import { Projects } from "../projects";
import { Skills } from "../skills";
import { Assignments } from "../assignments";

const MockNavbarWithTheme = () => {
  return (
    <ThemeProvider enableSystem={false} attribute='class'>
      <Navbar />
    </ThemeProvider>
  );
};

const MockLandingPageWithTheme = async () => {
  // Cypress component testing does not support server components
  const component = await Assignments();

  return (
    <>
      <ThemeProvider enableSystem={false} attribute='class'>
        <Navbar />
        <main className='bg-zinc-100 dark:bg-dark-100 duration-200 [&>section]:scroll-mt-12'>
          <LandingPage />
          <Profile />
          <Projects />
          <Skills />
          {component}
        </main>
      </ThemeProvider>
    </>
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

  it("should expand the navbar when the scroll position at the top of the page ", async () => {
    const component = await MockLandingPageWithTheme();
    cy.mount(component);

    cy.get("nav").invoke("outerHeight").should("be.greaterThan", 90);
  });

  it("should reduce the height of the navbar if scrolling down ", async () => {
    const component = await MockLandingPageWithTheme();
    cy.mount(component);

    cy.scrollTo(0, 100);
    cy.wait(0);

    cy.get("nav").invoke("outerHeight").should("be.lessThan", 60);
  });

  it("should show the menuitems on mobile on menu burger click", { viewportHeight: 500, viewportWidth: 500 }, () => {
    cy.mount(<MockNavbarWithTheme />);
    cy.get("button[aria-label='Show navigation']").click();

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("be.visible");
      cy.contains("li", "Projects").should("be.visible");
      cy.contains("li", "Skills").should("be.visible");
    });

    cy.get("nav").invoke("outerHeight").should("eq", 500);
    cy.get("nav>.grid").invoke("outerHeight").should("eq", 500);
  });

  it("should hide the menuitems on mobile on menu burger click again", () => {
    cy.mount(<MockNavbarWithTheme />);
    cy.get("button[aria-label='Show navigation']").click();
    cy.get("button[aria-label='Hide navigation']").click();

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("not.be.visible");
      cy.contains("li", "Projects").should("not.be.visible");
      cy.contains("li", "Skills").should("not.be.visible");
    });
  });

  it("should display the navigation on desktop", () => {
    cy.viewport(850, 500);
    cy.mount(<MockNavbarWithTheme />);

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("be.visible");
      cy.contains("li", "Projects").should("be.visible");
      cy.contains("li", "Skills").should("be.visible");
    });
  });

  it("should not display the navigation on mobile", () => {
    cy.viewport(500, 500);
    cy.mount(<MockNavbarWithTheme />);

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("not.be.visible");
      cy.contains("li", "Projects").should("not.be.visible");
      cy.contains("li", "Skills").should("not.be.visible");
    });
  });

  it("should show the navigation if increasing the viewport from mobile size to desktop size", async () => {
    cy.viewport(500, 500);
    cy.mount(<MockNavbarWithTheme />);

    cy.viewport(850, 500);

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("be.visible");
      cy.contains("li", "Projects").should("be.visible");
      cy.contains("li", "Skills").should("be.visible");
    });
  });

  it(
    "should show the navigation minimized if the viewport is decreased from desktop size to mobile size",
    { viewportWidth: 850, viewportHeight: 500 },
    async () => {
      const component = await MockLandingPageWithTheme();
      cy.mount(component);

      cy.viewport(500, 500);

      cy.get("button[aria-label='Show navigation']").should("be.visible");
    }
  );

  it(
    "should keep the navigation visible if the viewport on mobile is changed",
    { viewportWidth: 400, viewportHeight: 500 },
    async () => {
      const component = await MockLandingPageWithTheme();
      cy.mount(component);

      cy.get("button[aria-label='Show navigation']").click();

      cy.viewport(500, 500);

      cy.get("button[aria-label='Hide navigation']").should("be.visible");
    }
  );

  it("should navigate to projects if clicking on Projects in navbar", async () => {
    const component = await MockLandingPageWithTheme();
    cy.mount(component);
    cy.viewport(850, 500);

    // Remove the leading slash and click on Projects in navbar
    cy.get("nav").contains("a", "Projects").removeHrefSlash().click();

    cy.contains("h2", "Projects").should("be.visible");
  });

  it("should navigate to skills if clicking on Skills in the navbar", async () => {
    const component = await MockLandingPageWithTheme();
    cy.mount(component);
    cy.viewport(850, 500);

    // Remove the leading slash and click on Skills in navbar
    cy.contains("a", "Skills").removeHrefSlash().click();

    cy.contains("h2", "Skills").should("be.visible");
  });

  it("should scroll to top if clicking on Home in the navbar", async () => {
    const component = await MockLandingPageWithTheme();
    cy.mount(component);

    cy.viewport(850, 500);

    cy.scrollTo(0, 300, { duration: 0 }).then(() => {
      cy.wait(100);
      cy.contains("a", "Home")
        .invoke("attr", "href", "#top") //replace the href for component testing
        .click()
        .then(() => {
          cy.wait(300);
          cy.window().then(($window) => {
            expect($window.scrollY).to.eq(0);
          });
        });
    });
  });

  it("should minimize the navbar on mobile after item click", async () => {
    const component = await MockLandingPageWithTheme();
    cy.mount(component);

    cy.get("button[aria-label='Show navigation']").click();

    cy.contains("a", "Projects").removeHrefSlash().click();

    cy.get("nav").find("ul").should("not.be.visible");
  });

  it("should keep the navbar items visible on desktop viewport if clicking on item", async () => {
    const component = await MockLandingPageWithTheme();
    cy.mount(component);
    cy.viewport(850, 500);

    cy.get("nav").contains("a", "Projects").removeHrefSlash().click();

    cy.get("nav").within(() => {
      cy.contains("li", "Home").should("be.visible");
      cy.contains("li", "Projects").should("be.visible");
      cy.contains("li", "Skills").should("be.visible");
    });
  });
});
