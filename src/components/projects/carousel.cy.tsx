/// <reference types="cypress" />
import Image from "next/image";

import { Carousel } from "./carousel";
import { Video } from ".";

import "@/app/globals.css";

const items = [
  {
    type: "image",
    resource: "/projects/repeatio/extended-match.png",
    alt: "Multiple Response Question",
  },
  {
    type: "image",
    resource: "/projects/Webinar-Certificates/main.png",
    alt: "Interface for software",
  },
  {
    type: "image",
    resource: "/projects/Internet-Check/main.png",
    alt: "Simple UI for software reading Start",
  },
];

const MockCarousel = () => {
  return (
    <div
      className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 lg:px-0 lg:p-4 w-full lg:w-[50%]  lg:h-[650px] h-[400px] lg:max-h-none relative order-0 `}
    >
      <Carousel>
        {items?.map((item, i) => {
          if (item.type === "image") {
            return (
              <Image
                key={i}
                draggable='false'
                src={item.resource}
                width={650}
                height={520}
                alt={item.alt as string}
                className='object-contain w-full max-h-full p-[1px]'
                unoptimized
              />
            );
          } else if (item.type === "video") {
            return <Video key={i} resource={item.resource} />;
          }
        })}
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

    // Wait for all images to load
    cy.get("img").should("have.length", 3).and("be.visible");

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
    cy.get(".carousel-dots").find("button").should("have.length", 3);
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
