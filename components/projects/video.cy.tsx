/// <reference types="cypress" />
import { Carousel } from "./carousel";

import "../../styles/globals.css";

const items = [
  {
    type: "video",
    resource: "https://www.youtube-nocookie.com/embed/GgP1WLHhPMY",
  },
  {
    type: "image",
    resource: "/images/repeatio-question.png",
    alt: "Multiple Response Question",
  },
];

const MockCarousel = () => {
  return (
    <div
      className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 lg:px-0 lg:p-4 w-full lg:w-[50%]  lg:h-[650px] h-[400px] lg:max-h-none relative order-0 `}
    >
      <Carousel items={items} unoptimizedImages={true} />
    </div>
  );
};

describe("<Video />", () => {
  it("should show the YouTube consent info", () => {
    cy.mount(<MockCarousel />);
    cy.contains("h3", "Activate external Media").should("exist");
    cy.get("iframe[title='YouTube video player'").should("not.exist");
  });

  it("should update the localStorage if clicking on 'I understand'", () => {
    cy.mount(<MockCarousel />);
    cy.contains("button", "I understand")
      .click()
      .should(() => {
        const localStorageItem = JSON.parse(localStorage.getItem("youtube-consent") as string);
        expect(localStorageItem).to.equal(true);
      });

    cy.get("iframe[title='YouTube video player'").should("exist");
  });

  it("should update the sessionStorage if clicking on 'I understand' and unchecking 'Do not show again'", () => {
    cy.mount(<MockCarousel />);
    cy.contains("label", "Do not show again").click();
    cy.contains("button", "I understand")
      .click()
      .should(() => {
        const sessionStorageItem = JSON.parse(sessionStorage.getItem("youtube-consent") as string);
        expect(sessionStorageItem).to.equal(true);
      });

    cy.get("iframe[title='YouTube video player'").should("exist");
  });

  it("should not show the Consent warning if the consent is in the localStorage", () => {
    localStorage.setItem("youtube-consent", JSON.stringify(true, null, "\t"));
    cy.mount(<MockCarousel />);
    cy.get("iframe[title='YouTube video player'").should("exist");
    cy.contains("h3", "Activate external Media").should("not.exist");
  });
});
