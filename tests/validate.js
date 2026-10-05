#!/usr/bin/env node
/**
 * Lightweight CI test for the MallPro AI Vision static site.
 * No build step and no runtime deps -- this just proves the shipped
 * HTML is well-formed and the embedded JS is syntactically valid
 * before the deploy job publishes it to GitHub Pages.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.join(__dirname, "..", "index.html");
const html = fs.readFileSync(file, "utf8");

let failures = 0;
function check(label, ok) {
  if (ok) {
    console.log("  ok  - " + label);
  } else {
    console.error("FAIL  - " + label);
    failures++;
  }
}

console.log("Validating " + file);

// 1. Required tags balance (cheap structural smoke test)
["div", "section", "svg", "span", "button"].forEach((tag) => {
  const open = (html.match(new RegExp("<" + tag + "(\\s|>)", "g")) || []).length;
  const close = (html.match(new RegExp("</" + tag + ">", "g")) || []).length;
  check(`<${tag}> tags balanced (${open} open / ${close} close)`, open === close);
});

// 2. Title present
check("has a <title>", /<title>[^<]+<\/title>/.test(html));

// 3. Extract and syntax-check the inline <script> block
const match = html.match(/<script>([\s\S]*)<\/script>/);
check("found an inline <script> block", !!match);
if (match) {
  try {
    new vm.Script(match[1], { filename: "index.html:inline-script" });
    check("inline script has valid JavaScript syntax", true);
  } catch (e) {
    check("inline script has valid JavaScript syntax: " + e.message, false);
  }
}

// 4. Spot-check the key workspaces exist so a bad edit can't silently drop a page
["page-overview", "page-tenants", "page-revenue", "page-staff", "page-zones", "page-events", "page-analytics", "page-report", "page-cameras", "page-system", "page-support", "page-roadmap"].forEach((id) => {
  check(`section #${id} present`, html.includes('id="' + id + '"'));
});

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll checks passed.");
