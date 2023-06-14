/// <reference types="cypress" />
import Image from "next/image";

import { Carousel } from "./carousel";
import "../../styles/globals.css";

const items = [
  {
    type: "image",
    resource: "/images/repeatio-question.png",
    alt: "Multiple Response Question",
  },
  {
    type: "image",
    resource: "/images/Teilnahmebescheinigung.png",
    alt: "Interface for software",
  },
  {
    type: "image",
    resource: "/images/Internet-Check.png",
    alt: "Simple UI for software reading Start",
  },
];

const MockCarousel = () => {
  return (
    <div
      className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 md:p-6 md:w-[50%] md:h-[450px] order-0`}
    >
      <Carousel>
        {items.map((item, i) => (
          <Image
            key={i}
            draggable='false'
            src={item.resource}
            width={650}
            height={400}
            alt={item.alt}
            className='object-scale-down w-full max-h-full p-[1px]'
            unoptimized
          />
        ))}
      </Carousel>
    </div>
  );
};

describe("<Carousel />", () => {
  it("should render 3 images in the carousel", () => {
    cy.mount(<MockCarousel />);
    cy.get("img").should("have.length", 3);
  });

  it("should hide the second and third element", () => {
    cy.mount(<MockCarousel />);

    cy.document().then((doc) => {
      const firstImageWidth = doc.querySelector("img:first-child")?.getBoundingClientRect().width ?? 0;
      const leftButtonWidth =
        doc.querySelector("button[aria-label='View previous item']")?.getBoundingClientRect().width ?? 0;

      const gap = parseInt(window.getComputedStyle(doc.querySelector("div.grid") as Element).gap.split("px")[0]);

      const secondImage = doc.querySelectorAll("img")[1]?.getBoundingClientRect();

      const value = firstImageWidth + leftButtonWidth + gap;

      expect(secondImage?.left).to.eq(value);
    });
  });

  it("should show image if clicking on next button", () => {
    // Clicking twice to show the last element because cypress thinks the second element is visible although it isn't
    cy.mount(<MockCarousel />);
    cy.get("button[aria-label='View next item']").click().click();
    cy.get("img[alt='Simple UI for software reading Start']").should("be.visible");
  });

  it("should show three dots at the bottom of the carousel", () => {
    cy.mount(<MockCarousel />);
    cy.get("#carousel-dots").find("button").should("have.length", 3);
  });

  it("should show the last item if clicking on the circle at the bottom of the carousel", () => {
    cy.mount(<MockCarousel />);
    cy.get("button[aria-label='View third item'").click();
    cy.get("img[alt='Simple UI for software reading Start']").should("be.visible");
  });

  it("should highlight the next dot if moving the next item", () => {
    cy.mount(<MockCarousel />);
    cy.get("button[aria-label='View next item']").click();
    cy.get("button[aria-label='View second item']").find("div").should("have.class", "bg-zinc-700");
  });

  it("should support touching action", () => {
    cy.mount(<MockCarousel />);
    cy.get("img[alt='Multiple Response Question'")
      .realSwipe("toLeft", { length: 125, x: 250 })
      .realSwipe("toLeft", { length: 125, x: 250 });
    cy.get("img[alt='Simple UI for software reading Start']").should("be.visible");
  });

  it("should restart the carousel if at the end of the carousel", () => {
    cy.mount(<MockCarousel />);
    cy.get("button[aria-label='View next item']").click().click().click();
    cy.get("img[alt='Multiple Response Question'").should("be.visible");
  });
});
