import { describe, it, expect } from "vitest";
import { JSDOM } from "jsdom";
import {
  processLists,
  removeClassAndStyleAttributes,
  removeContentBeforeIntroduction,
  removeHead,
} from "./processHtmlHelpers";

describe("removeContentBeforeIntroduction", () => {
  it('removes content before heading with exact "1. Einleitung"', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <div>Table of Contents</div>
          <p>Some prefix content</p>
          <h1>1. Einleitung</h1>
          <p>Introduction content</p>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    removeContentBeforeIntroduction(doc);

    // Check that content before intro is removed
    expect(doc.body.innerHTML).not.toContain("Table of Contents");
    expect(doc.body.innerHTML).not.toContain("Some prefix content");
    expect(doc.body.innerHTML).toContain("<h1>1. Einleitung</h1>");
    expect(doc.body.innerHTML).toContain("<p>Introduction content</p>");
  });

  it('handles heading with "Einleitung" inside anchor tag and span', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <div>Abbreviations</div>
          <h1 style='line-height:normal'><a name="_Toc185183210"><span>1. Einleitung</span></a></h1>
          <p>Introduction content</p>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    removeContentBeforeIntroduction(doc);

    // Check that content before intro is removed
    expect(doc.body.innerHTML).not.toContain("Abbreviations");
    expect(doc.body.innerHTML).toContain("_Toc185183210");
    expect(doc.body.innerHTML).toContain("1. Einleitung");
    expect(doc.body.innerHTML).toContain("Introduction content");
  });
});

describe("removeClassAndStyleAttributes", () => {
  it("removes all class attributes from elements", () => {
    // Create a test document
    const dom = new JSDOM(`
      <html>
        <body>
          <div class="container">
            <p class="paragraph text-large">Text with class</p>
            <span class="inline">Inline text</span>
          </div>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Call the function
    removeClassAndStyleAttributes(doc);

    // Check that all class attributes are removed
    expect(doc.querySelector("div")?.getAttribute("class")).toBeNull();
    expect(doc.querySelector("p")?.getAttribute("class")).toBeNull();
    expect(doc.querySelector("span")?.getAttribute("class")).toBeNull();
  });

  it("removes all style attributes from elements", () => {
    // Create a test document
    const dom = new JSDOM(`
      <html>
        <body>
          <div style="margin: 10px;">
            <p style="color: red; font-size: 16px;">Styled text</p>
            <span style="font-weight: bold;">Bold text</span>
          </div>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Call the function
    removeClassAndStyleAttributes(doc);

    // Check that all style attributes are removed
    expect(doc.querySelector("div")?.getAttribute("style")).toBeNull();
    expect(doc.querySelector("p")?.getAttribute("style")).toBeNull();
    expect(doc.querySelector("span")?.getAttribute("style")).toBeNull();
  });

  it("handles elements with no class or style attributes", () => {
    // Create a test document
    const dom = new JSDOM(`
      <html>
        <body>
          <div>
            <p>Plain text</p>
            <span>More text</span>
          </div>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Function should run without errors
    expect(() => removeClassAndStyleAttributes(doc)).not.toThrow();
  });

  it("handles complex nested elements", () => {
    // Create a test document with nested elements
    const dom = new JSDOM(`
      <html>
        <body>
          <div class="outer" style="padding: 20px;">
            <div class="inner" style="margin: 5px;">
              <table class="data-table" style="width: 100%;">
                <tr class="row" style="height: 30px;">
                  <td class="cell" style="text-align: center;">Data</td>
                </tr>
              </table>
            </div>
          </div>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Call the function
    removeClassAndStyleAttributes(doc);

    // Verify all attributes are removed at all levels
    const elements = doc.querySelectorAll("*");
    elements.forEach((el) => {
      expect(el.getAttribute("class")).toBeNull();
      expect(el.getAttribute("style")).toBeNull();
    });
  });
});

describe("removeHead", () => {
  it("removes the head tag and all its contents", () => {
    // Create a test document with head content
    const dom = new JSDOM(`
      <html>
        <head>
          <title>Test Document</title>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="styles.css">
          <script src="script.js"></script>
        </head>
        <body>
          <h1>Test Content</h1>
          <p>This is a test paragraph</p>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    removeHead(doc);

    // Verify head and all its contents are removed
    expect(doc.querySelector("head")).toBeNull();
    expect(doc.querySelector("title")).toBeNull();
    expect(doc.querySelector("meta")).toBeNull();
    expect(doc.querySelector("link")).toBeNull();
    expect(doc.querySelector("script")).toBeNull();

    // Verify body content is preserved
    expect(doc.querySelector("body")).not.toBeNull();
    expect(doc.querySelector("h1")?.textContent).toBe("Test Content");
    expect(doc.querySelector("p")?.textContent).toBe("This is a test paragraph");
  });
});

describe("processLists", () => {
  it("converts list paragraphs to HTML list", () => {
    // Create test document with list paragraphs
    const dom = new JSDOM(`
      <html>
        <body>
          <p class="MsoListParagraphCxSpFirst">First item</p>
          <p class="MsoListParagraphCxSpMiddle">Second item</p>
          <p class="MsoListParagraphCxSpLast">Third item</p>
          <p>Normal paragraph</p>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Call the function
    processLists(doc);

    // Verify list structure
    const ul = doc.querySelector("ul");
    expect(ul).not.toBeNull();

    const listItems = doc.querySelectorAll("li");
    expect(listItems.length).toBe(3);

    // Verify list item content
    const itemTexts = Array.from(listItems).map((li) => li.textContent);
    expect(itemTexts).toEqual(["First item", "Second item", "Third item"]);

    // Verify normal paragraph is preserved
    expect(doc.querySelector("p")?.textContent).toBe("Normal paragraph");
  });

  it("removes bullet characters from list items", () => {
    // Create test document with bullet characters
    const dom = new JSDOM(`
      <html>
        <body>
          <p class="MsoListParagraphCxSpFirst"><span>•</span> First item</p>
          <p class="MsoListParagraphCxSpLast">· Second item</p>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Call the function
    processLists(doc);

    // Verify list structure
    const listItems = doc.querySelectorAll("li");
    expect(listItems.length).toBe(2);

    // Verify bullet characters were removed
    expect(listItems[0].innerHTML).not.toContain("•");
    expect(listItems[1].innerHTML).not.toContain("·");

    // Verify content is preserved
    expect(listItems[0].textContent?.trim()).toBe("First item");
    expect(listItems[1].textContent?.trim()).toBe("Second item");
  });

  it("creates separate lists when interrupted by other content", () => {
    // Create test document with multiple lists
    const dom = new JSDOM(`
      <html>
        <body>
          <p class="MsoListParagraphCxSpFirst">List 1 Item 1</p>
          <p class="MsoListParagraphCxSpLast">List 1 Item 2</p>
          <p>Normal paragraph</p>
          <p class="MsoListParagraphCxSpFirst">List 2 Item 1</p>
          <p class="MsoListParagraphCxSpLast">List 2 Item 2</p>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Call the function
    processLists(doc);

    // Verify two separate lists were created
    const lists = doc.querySelectorAll("ul");
    expect(lists.length).toBe(2);

    // Verify lists have correct items
    const firstListItems = lists[0].querySelectorAll("li");
    const secondListItems = lists[1].querySelectorAll("li");

    expect(firstListItems.length).toBe(2);
    expect(secondListItems.length).toBe(2);

    expect(firstListItems[0].textContent).toBe("List 1 Item 1");
    expect(secondListItems[0].textContent).toBe("List 2 Item 1");
  });

  it("preserves HTML formatting inside list items", () => {
    // Create test document with formatted content
    const dom = new JSDOM(`
      <html>
        <body>
          <p class="MsoListParagraphCxSpFirst"><span>•</span> Item with <strong>bold</strong> text</p>
          <p class="MsoListParagraphCxSpLast"><span>•</span> Item with <a href="#link">link</a></p>
        </body>
      </html>
    `);
    const doc = dom.window.document;

    // Call the function
    processLists(doc);

    // Verify HTML formatting is preserved
    const listItems = doc.querySelectorAll("li");

    expect(listItems[0].querySelector("strong")).not.toBeNull();
    expect(listItems[0].querySelector("strong")?.textContent).toBe("bold");

    const link = listItems[1].querySelector("a");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("#link");
    expect(link?.textContent).toBe("link");
  });
});
