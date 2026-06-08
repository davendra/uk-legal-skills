import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { XMLParser } from "fast-xml-parser";
import {
  parseAtomEntries,
  parseJudgment,
  uriToFilename,
  dedupeByUri,
} from "./caselaw-utils.js";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: true,
});

describe("parseAtomEntries", () => {
  it("parses a single entry with all fields", () => {
    const xml = `<?xml version="1.0"?>
      <feed xmlns="http://www.w3.org/2005/Atom">
        <entry>
          <title>Test v Example [2024] EWCA Civ 123</title>
          <link href="https://caselaw.nationalarchives.gov.uk/ewca/civ/2024/123"/>
          <id>https://caselaw.nationalarchives.gov.uk/id/ewca/civ/2024/123</id>
          <updated>2024-06-15T10:00:00Z</updated>
          <summary>Neutral citation: [2024] EWCA Civ 123</summary>
        </entry>
      </feed>`;
    const parsed = xmlParser.parse(xml);
    const entries = parseAtomEntries(parsed);
    assert.equal(entries.length, 1);
    assert.match(entries[0].name, /Test v Example/);
    assert.equal(entries[0].uri, "ewca/civ/2024/123");
    assert.equal(entries[0].date, "2024-06-15T10:00:00Z");
    assert.match(entries[0].neutralCitation, /\[2024\] EWCA Civ 123/);
  });

  it("returns [] for empty feed", () => {
    const parsed = xmlParser.parse(`<feed xmlns="http://www.w3.org/2005/Atom"/>`);
    assert.deepEqual(parseAtomEntries(parsed), []);
  });

  it("handles multiple entries", () => {
    const xml = `<?xml version="1.0"?>
      <feed xmlns="http://www.w3.org/2005/Atom">
        <entry>
          <title>A v B</title>
          <link href="https://caselaw.nationalarchives.gov.uk/uksc/2024/1"/>
          <id>https://caselaw.nationalarchives.gov.uk/id/uksc/2024/1</id>
          <updated>2024-01-01T00:00:00Z</updated>
        </entry>
        <entry>
          <title>C v D</title>
          <link href="https://caselaw.nationalarchives.gov.uk/uksc/2024/2"/>
          <id>https://caselaw.nationalarchives.gov.uk/id/uksc/2024/2</id>
          <updated>2024-02-01T00:00:00Z</updated>
        </entry>
      </feed>`;
    const parsed = xmlParser.parse(xml);
    const entries = parseAtomEntries(parsed);
    assert.equal(entries.length, 2);
    assert.equal(entries[0].uri, "uksc/2024/1");
    assert.equal(entries[1].uri, "uksc/2024/2");
  });
});

describe("parseJudgment", () => {
  it("extracts core metadata from Akoma Ntoso", () => {
    const xml = `<?xml version="1.0"?>
      <akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
        <judgment>
          <meta>
            <identification>
              <FRBRWork>
                <FRBRthis value="https://caselaw.nationalarchives.gov.uk/id/uksc/2024/1"/>
                <FRBRdate date="2024-01-15"/>
              </FRBRWork>
            </identification>
          </meta>
          <header>
            <p>UK Supreme Court</p>
            <p>Before Lord Reed and Lord Hodge</p>
            <p>Between: Smith (Appellant) and Jones (Respondent)</p>
          </header>
          <judgmentBody>
            <decision>
              <p>The appeal is dismissed.</p>
            </decision>
          </judgmentBody>
        </judgment>
      </akomaNtoso>`;
    const parsed = xmlParser.parse(xml);
    const result = parseJudgment(parsed);
    assert.equal(result.date, "2024-01-15");
    assert.match(result.body, /appeal is dismissed/);
    assert.ok(result.body.length > 0);
  });

  it("handles missing meta gracefully", () => {
    const parsed = xmlParser.parse(`<akomaNtoso/>`);
    const result = parseJudgment(parsed);
    assert.equal(result.date, "");
    assert.equal(result.body, "");
  });
});

describe("uriToFilename", () => {
  it("converts slashes to dashes and appends .pdf", () => {
    assert.equal(uriToFilename("uksc/2024/42"), "uksc-2024-42.pdf");
  });

  it("handles dotted IDs", () => {
    assert.equal(uriToFilename("tna.t7sh6v3m"), "tna.t7sh6v3m.pdf");
  });

  it("strips unsafe characters", () => {
    assert.equal(uriToFilename("../../../etc/passwd"), "etc-passwd.pdf");
  });
});

describe("dedupeByUri", () => {
  it("removes duplicates by uri, keeping first occurrence", () => {
    const results = [
      { uri: "a", name: "First", date: "", neutralCitation: "", court: "" },
      { uri: "b", name: "B", date: "", neutralCitation: "", court: "" },
      { uri: "a", name: "Duplicate", date: "", neutralCitation: "", court: "" },
    ];
    const deduped = dedupeByUri(results);
    assert.equal(deduped.length, 2);
    assert.equal(deduped[0].name, "First");
    assert.equal(deduped[1].uri, "b");
  });
});
