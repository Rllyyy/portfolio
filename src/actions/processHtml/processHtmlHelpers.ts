import { JSDOM } from "jsdom";

export async function processHtml(content: string, moduleId: string): Promise<string> {
  // Create a DOMParser
  const dom = new JSDOM(content);
  const doc = dom.window.document;

  // Simplify document structure
  simplifyDocumentStructure(doc);

  // Process introduction section
  removeContentBeforeIntroduction(doc);

  // Remove head tag and its contents
  removeHead(doc);

  removeBrTags(doc);

  // Process paragraphs, but preserve those containing images
  cleanUpEmptyParagraphs(doc);

  // Track ongoing list creation
  processLists(doc);

  // Remove all class attributes and class-related styles
  removeClassAndStyleAttributes(doc);

  // Process span tags containing numbers in brackets
  wrapSpanNumberInSup(doc);

  // Find and flatten nested sup elements
  flattenNestedSupElements(doc);

  // Process image sources
  transformImageSource(doc, moduleId);

  removeAlignFromImageTags(doc);

  // Find each table and wrap it inside a div with the style "overflow-x: auto"
  wrapTablesInResponsiveDiv(doc);

  transformHeadingsByPattern(doc);

  let result = extractBodyInnerHtml(doc);

  // Replace multiple consecutive blank lines with a single line break
  result = normalizeLineBreaks(result);

  // Remove leading/trailing whitespace
  return result.trim();
}

/**
 * Simplifies the document structure by removing unnecessary wrapper divs
 */
function simplifyDocumentStructure(doc: Document): void {
  const body = doc.body;
  if (body.children.length === 1 && body.children[0].tagName.toLowerCase() === "div") {
    const div = body.children[0];
    body.innerHTML = div.innerHTML;
  }
}

/**
 * Finds introduction heading and removes all content before it
 */
export function removeContentBeforeIntroduction(doc: Document): void {
  // Find the h1 tag containing "1. Einleitung"
  const introHeadings = Array.from(doc.querySelectorAll("h1, h2, h3, h4")).filter((heading) => {
    const headingText = heading.textContent || "";
    return headingText.includes("Einleitung") && /^\d+\.?\s*Einleitung/.test(headingText);
  });

  if (introHeadings.length > 0) {
    const introHeading = introHeadings[0];
    removeNodesBefore(doc, introHeading);
  }
}

/**
 * Removes all nodes that come before the specified target node
 */
function removeNodesBefore(doc: Document, targetNode: Element): void {
  // Find all nodes that come before this heading in the document body
  const nodesToRemove: Node[] = [];

  // Start from the first child of the body
  let currentNode = doc.body.firstChild;

  // Collect all nodes until we reach the intro heading or a parent of it
  while (currentNode) {
    if (currentNode === targetNode || currentNode === targetNode.parentElement || currentNode.contains(targetNode)) {
      break;
    }

    nodesToRemove.push(currentNode);
    currentNode = currentNode.nextSibling;
  }

  // Remove all these nodes
  nodesToRemove.forEach((node) => {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

/**
 * Removes the head tag and all its contents
 */
export function removeHead(doc: Document): void {
  const head = doc.querySelector("head");
  if (head) {
    head.remove();
  }
}

/**
 * Removes all br tags from the document
 */
function removeBrTags(doc: Document): void {
  doc.querySelectorAll("br").forEach((br) => {
    br.remove();
  });
}

/**
 * Removes empty paragraphs and paragraphs that only contain images
 */
function cleanUpEmptyParagraphs(doc: Document) {
  doc.querySelectorAll("p").forEach((p) => {
    // Replace all &nbsp; entities with regular spaces
    p.innerHTML = p.innerHTML.replace(/&nbsp;/g, " ");

    // Check if paragraph contains an image
    const hasImage = p.querySelector("img") !== null;

    // Only remove empty paragraphs that don't contain images
    if ((!p.textContent || p.textContent.trim() === "") && !hasImage) {
      p.remove();
    }
  });
}

/**
 * Processes paragraphs that are part of a list
 */
export function processLists(doc: Document) {
  let currentList: Element | null = null;

  doc.querySelectorAll("p").forEach((p) => {
    const className = p.className;
    if (
      className.includes("MsoListParagraphCxSpFirst") ||
      className.includes("MsoListParagraphCxSpMiddle") ||
      className.includes("MsoListParagraphCxSpLast")
    ) {
      const listItem = doc.createElement("li");

      // Clean up bullet point spans before converting to list item
      const bulletSpan = p.querySelector("span:first-child");
      if (
        bulletSpan &&
        bulletSpan.textContent &&
        (bulletSpan.textContent.trim() === "·" ||
          bulletSpan.textContent.trim() === "•" ||
          bulletSpan.textContent.includes("·") ||
          bulletSpan.textContent.includes("•"))
      ) {
        bulletSpan.remove();
      }

      // Clean up the content by removing any leading bullet characters
      let content = p.innerHTML;
      content = content.replace(/^[·•](\s|&nbsp;)+/g, ""); // Remove leading bullet and spaces

      // Set the cleaned content to the new list item
      listItem.innerHTML = content;

      // Start a new list if this is the first item or no current list exists
      if (className.includes("MsoListParagraphCxSpFirst") || !currentList) {
        currentList = doc.createElement("ul");
        currentList.appendChild(listItem);
        p.parentNode?.replaceChild(currentList, p);
      }

      // Continue using the existing list
      else if (currentList) {
        currentList.appendChild(listItem);
        p.parentNode?.removeChild(p);
      }

      // If this is the last item in the list, reset currentList
      if (className.includes("MsoListParagraphCxSpLast")) {
        currentList = null;
      }
    } else {
      // This is not a list paragraph, so reset any ongoing list
      currentList = null;
    }
  });
}

/**
 * Removes all class attributes and class-related styles
 */
export function removeClassAndStyleAttributes(doc: Document) {
  doc.querySelectorAll("*").forEach((el) => {
    el.removeAttribute("class");
    el.removeAttribute("style");
  });
}

/**
 * Processes span tags containing numbers in brackets
 */
function wrapSpanNumberInSup(doc: Document) {
  doc.querySelectorAll("span:not(sup span)").forEach((span) => {
    // Check if the span contains a number in brackets
    const text = span.textContent?.trim() || "";
    if (/^\[\d+\]$/.test(text)) {
      // Create a new sup element
      const sup = doc.createElement("sup");
      // Copy the span's content to the sup
      sup.innerHTML = text;
      // Replace the span with the sup
      span.parentNode?.replaceChild(sup, span);
    }
  });
}

/**
 * Finds and flattens nested sup elements
 */
function flattenNestedSupElements(doc: Document) {
  doc.querySelectorAll("sup sup").forEach((innerSup) => {
    // Get the parent sup element
    const outerSup = innerSup.parentElement;

    // Only process if parent is actually a sup element
    if (outerSup?.tagName.toLowerCase() === "sup") {
      // Move the content of the inner sup into the outer sup
      while (innerSup.firstChild) {
        outerSup.appendChild(innerSup.firstChild);
      }

      // Remove the now-empty inner sup
      innerSup.remove();
    }
  });
}

/**
 * Processes image sources
 */
// Turn the highlighted code is to complex, just turn this Visualisierung%20in%20einer%20Präsentation%20-%20public-Dateien/image003.png into this image003.png by getting the last part of the path
function transformImageSource(doc: Document, moduleId: string) {
  doc.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src) {
      // Extract the last part of the path
      const parts = src.split("/");
      const lastPart = parts[parts.length - 1];

      console.log(parts, lastPart);

      // Set the new source
      img.setAttribute("src", `/assignments/${moduleId}/${lastPart}`);
    }
  });
}

function removeAlignFromImageTags(doc: Document) {
  doc.querySelectorAll("img").forEach((img) => {
    img.removeAttribute("align");
  });
}

/**
 * Wraps each table inside a div with the style "overflow-x: auto"
 */
function wrapTablesInResponsiveDiv(doc: Document) {
  doc.querySelectorAll("table").forEach((table) => {
    const div = doc.createElement("div");
    div.style.overflowX = "auto";
    table.parentNode?.replaceChild(div, table);
    div.appendChild(table);
  });
}

/**
 * Transforms headings
 */
function transformHeadingsByPattern(doc: Document) {
  doc.querySelectorAll("h1").forEach((h1) => {
    const span = h1.querySelector("span");
    const directLink = h1.querySelector("a");
    const isSpanInLink = span && span.closest("a");

    // Get text content either from span or directly from h1
    const text = span ? span.textContent?.trim() || "" : h1.textContent?.trim() || "";

    // Determine which heading level to use based on the text pattern
    let newLevel = "h1"; // Default

    if (/^\d+\.\d+\.\d+\.\d+\s/.test(text)) {
      newLevel = "h5";
    } else if (/^\d+\.\d+\.\d+\s/.test(text)) {
      newLevel = "h4";
    } else if (/^\d+\.\d+\s/.test(text)) {
      newLevel = "h3";
    } else if (/^(?:\d+|[IVXLCDM]+)\.\s/.test(text)) {
      newLevel = "h2";
    } else {
      newLevel = "h3";
    }

    // Create new heading element with the appropriate level
    let newH = doc.createElement(newLevel);

    // Handle the different cases properly
    if (directLink && !span) {
      // Special handling for direct links without spans
      newH.textContent = directLink.textContent || "";
      const newLink = directLink.cloneNode(false) as HTMLAnchorElement;
      newLink.appendChild(newH);
      h1.parentNode?.replaceChild(newLink, h1);
    } else if (span && isSpanInLink) {
      // Handle span inside link case
      newH.textContent = text;
      const link = span.closest("a")!;
      const newLink = link.cloneNode(false) as HTMLAnchorElement;
      newLink.appendChild(newH);
      h1.parentNode?.replaceChild(newLink, h1);
    } else {
      // Default case: preserve all structure
      newH.innerHTML = h1.innerHTML;
      h1.parentNode?.replaceChild(newH, h1);
    }

    /*
    // Create new heading element with the appropriate level
    const newH = doc.createElement(newLevel);

    // Simply copy ALL the inner HTML content from the original h1
    // This preserves anchors, spans, and all nested content
    newH.innerHTML = h1.innerHTML;

    // Replace the h1 tag with our new heading
    h1.parentNode?.replaceChild(newH, h1);


    // Special handling for direct links without spans
    if (directLink && !span) {
      // Create new heading element
      const newH = doc.createElement(newLevel);

      // Copy the text content from inside the link
      newH.textContent = directLink.textContent || "";

      // Create a new link with the same attributes as the original
      const newLink = directLink.cloneNode(false) as HTMLAnchorElement;

      // Put the new heading inside the new link
      newLink.appendChild(newH);

      // Replace the h1 with the link+heading structure
      h1.parentNode?.replaceChild(newLink, h1);
    }

    // Handle span inside link case
    else if (span && isSpanInLink) {
      // Create new heading element
      const newH = doc.createElement(newLevel);
      newH.textContent = text;

      // Get the original link
      const link = span.closest("a")!;
      const newLink = link.cloneNode(false) as HTMLAnchorElement;

      // Put the new heading inside the new link
      newLink.appendChild(newH);

      // Replace the h1 with the link+heading structure
      h1.parentNode?.replaceChild(newLink, h1);
    }

    // Default case: no direct link or span not in link
    else {
      // Create a new element for the heading
      const newH = doc.createElement(newLevel);

      // Clone the original heading content to preserve structure
      h1.childNodes.forEach((node) => {
        const clone = node.cloneNode(true);
        newH.appendChild(clone);
      });

      // Replace the h1 tag with our new heading
      h1.parentNode?.replaceChild(newH, h1);
    }
      */
  });
}

/**
 * Extracts the inner HTML of the body tag
 */
function extractBodyInnerHtml(doc: Document) {
  return doc.body.innerHTML
    .replace(/<body>/g, "")
    .replace(/<\/body>/g, "")
    .replaceAll(/<html>/g, "")
    .replaceAll(/<\/html>/g, "");
}

function normalizeLineBreaks(result: string) {
  return result.replace(/(\r?\n){2,}/g, "\n");
}

//TODO  remove align from image tags
