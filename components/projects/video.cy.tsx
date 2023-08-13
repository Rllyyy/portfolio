/// <reference types="cypress" />

import { Video } from ".";
import { Carousel } from "./carousel";
import projects from "./projects.json";
import Image from "next/image";

import "../../styles/globals.css";

const items = [
  {
    type: "video",
    resource: "https://www.youtube-nocookie.com/embed/Rqsy0nL4WK8",
  },
  {
    type: "image",
    resource: "/images/repeatio-question.png",
    alt: "Multiple Response Question",
  },
];

interface IMockCarouselItem {
  carouselItems: (typeof projects)[number]["carouselItems"];
}
const MockCarousel: React.FC<IMockCarouselItem> = ({ carouselItems }) => {
  return (
    <div
      className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 lg:px-0 lg:p-4 w-full lg:w-[50%]  lg:h-[650px] h-[400px] lg:max-h-none relative order-0 `}
    >
      <Carousel>
        {carouselItems?.map((item, i) => {
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

describe("<Video />", () => {
  it("should show the YouTube consent info", () => {
    cy.mount(<MockCarousel carouselItems={items} />);
    cy.contains("h3", "Activate external Media").should("exist");
    cy.get("iframe[title='YouTube video player'").should("not.exist");
  });

  it("should update the localStorage if clicking on 'I understand'", () => {
    cy.mount(<MockCarousel carouselItems={items} />);
    cy.contains("button", "I understand")
      .click()
      .should(() => {
        const localStorageItem = JSON.parse(localStorage.getItem("youtube-consent") as string);
        expect(localStorageItem).to.equal(true);
      });

    cy.get("iframe[title='YouTube video player'").should("exist");
  });

  it("should update the sessionStorage if clicking on 'I understand' and unchecking 'Do not show again'", () => {
    cy.mount(<MockCarousel carouselItems={items} />);
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
    cy.mount(<MockCarousel carouselItems={items} />);
    cy.get("iframe[title='YouTube video player'").should("exist");
    cy.contains("h3", "Activate external Media").should("not.exist");
  });
});
