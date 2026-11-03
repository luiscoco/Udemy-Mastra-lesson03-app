import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("submitted broken scaffold exposes actionable findings", async () => {
  const result = await run(LESSON.examples[1].input);
  assert.equal(result.status, "needs-attention");
  const data = result.data as { checks: { pass: boolean }[]; provider: { accessVerified: boolean } };
  assert(data.checks.filter(check => !check.pass).length >= 5); assert.equal(data.provider.accessVerified, false);
});
