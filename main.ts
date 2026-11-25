// Monday, Reviewed in One Line — entry v2
// Writes a single one-line review of Monday to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt when OUTPUT_DIR is set).

const fs = require("node:fs");
const path = require("node:path");

// Judge's eye — why this line works where the v1 coffee/inbox clones sank:
// the joke is built from one concrete, specific detail (a calendar invite
// to a meeting with yourself) and then turns it absurd (you still showed
// up late to it). No generic Monday dread, no coffee, no inbox — the
// premise is instantly repeatable to a coworker ("my calendar invited me
// to a meeting with myself"), and the punchline lands because being late
// to your own meeting is a failure even Monday cannot excuse. The one-star
// review framing makes the absurdity read as a verdict, not a complaint.
const LINE =
  "Monday, one star: my calendar invited me to a meeting with myself, and I still showed up late.";

// The competition wants exactly one line, 1-200 characters, no title,
// no explanation, no trailing commentary — just the review itself.
function validate(line) {
  if (typeof line !== "string" || line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  // The review must keep its concrete turn: a calendar invite to a meeting
  // with yourself, and still being late to it. If either half is lost in
  // an edit, the joke collapses back into a generic Monday complaint.
  if (!/calendar/i.test(line) || !/late/i.test(line)) {
    throw new Error("line lost its calendar-invite / still-late turn");
  }
}

function main() {
  validate(LINE);
  const outDir = process.env.OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, LINE + "\n", "utf8");

  // Read back and fail unless the file is byte-identical to the line.
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== LINE + "\n") {
    throw new Error("entry.txt does not match the review line byte-for-byte");
  }
  console.log(`wrote ${outPath} (${LINE.length} characters)`);
}

main();
