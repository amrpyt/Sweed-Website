import assert from "node:assert/strict";
import { htmlPathForPage, normalizePageUrl, routePathname } from "../packages/capture-core/src/index.js";

assert.equal(normalizePageUrl("https://example.com/a/?x=1#top"), "https://example.com/a");
assert.equal(routePathname("https://example.com/work/scrambler/"), "/work/scrambler");
assert.equal(htmlPathForPage("https://example.com/"), "index.html");
assert.equal(htmlPathForPage("https://example.com/work/scrambler"), "work/scrambler/index.html");

console.log("capture-core smoke ok");
