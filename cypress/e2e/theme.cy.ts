/// <reference types="cypress" />

describe("Theme", () => {
  it("should enable the dark mode if the user has prefers-color-scheme set to dark", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        const originalMatchMedia = win.matchMedia;
        win.matchMedia = (query) =>
          ({
            matches: query === "(prefers-color-scheme: dark)",
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => true,
          } as MediaQueryList);
        Object.defineProperty(win.matchMedia, "original", {
          writable: true,
          value: originalMatchMedia,
        });
      },
    });

    cy.get("html.dark").should("exist").and("have.attr", "style", "color-scheme: dark;");
  });

  it("should use the dark mode if the user has prefers-color-scheme set to light", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        const originalMatchMedia = win.matchMedia;
        win.matchMedia = (query) =>
          ({
            matches: query === "(prefers-color-scheme: light)",
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => true,
          } as MediaQueryList);
        Object.defineProperty(win.matchMedia, "original", {
          writable: true,
          value: originalMatchMedia,
        });
      },
    });

    cy.get("html.light").should("exist").and("have.attr", "style", "color-scheme: light;");
  });
});

export {};
