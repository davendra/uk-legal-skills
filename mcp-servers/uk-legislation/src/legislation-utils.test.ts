import test from "node:test";
import assert from "node:assert/strict";

import {
  cleanText,
  extractText,
  findNodes,
  parseSearchResults,
  truncate,
} from "./legislation-utils.js";

test("extractText flattens nested parsed XML structures and ignores attributes", () => {
  const node = {
    "@_id": "section-1",
    Title: { "#text": "Section 1" },
    Paragraph: [
      { "#text": "This" },
      { Strong: { "#text": "is" } },
      "text",
    ],
  };

  assert.equal(extractText(node), "Section 1 This is text");
});

test("cleanText collapses whitespace", () => {
  assert.equal(cleanText("  A   statute \n\t title  "), "A statute title");
});

test("truncate appends a marker when content exceeds the limit", () => {
  assert.equal(truncate("abcdef", 4), "abcd\n\n...truncated (full text exceeds limit)");
  assert.equal(truncate("abcd", 4), "abcd");
});

test("findNodes returns every matching nested node", () => {
  const input = {
    A: {
      Title: "One",
      Nested: [{ Title: "Two" }, { Other: { Title: "Three" } }],
    },
  };

  assert.deepEqual(findNodes(input, "Title"), ["One", "Two", "Three"]);
});

test("parseSearchResults extracts legislation metadata from atom-style entries", () => {
  const parsed = {
    feed: {
      entry: [
        {
          title: "Employment Rights Act 1996",
          id: "https://www.legislation.gov.uk/id/ukpga/1996/18",
          updated: "2024-01-01",
          link: { "@_href": "https://www.legislation.gov.uk/ukpga/1996/18" },
        },
      ],
    },
  };

  assert.deepEqual(parseSearchResults(parsed), [
    {
      title: "Employment Rights Act 1996",
      link: "https://www.legislation.gov.uk/ukpga/1996/18",
      updated: "2024-01-01",
      uri: "https://www.legislation.gov.uk/id/ukpga/1996/18",
      type: "ukpga",
      year: 1996,
      number: 18,
    },
  ]);
});
