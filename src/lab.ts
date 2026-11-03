import { readFile, access } from "node:fs/promises";
import { z } from "zod";
import { mastra } from "./mastra/index.js";
import { createTutor } from "./mastra/agents.js";
import { assertActive, credentialReady, generateAnswer, modelId, type AgentModel, type Emit, type LabResult } from "./core.js";
const manifest = z.object({ type: z.string().optional(), scripts: z.record(z.string(), z.string()).default({}), dependencies: z.record(z.string(), z.string()).default({}) }).passthrough();
export const inputSchema = z.discriminatedUnion("mode", [z.object({ mode: z.literal("current") }).strict(), z.object({ mode: z.literal("submitted"), nodeVersion: z.string().max(40), package: manifest, files: z.array(z.string().max(120)).max(100) }).strict()]);
export async function executeLab(raw: unknown, emit: Emit, signal: AbortSignal): Promise<LabResult> {
  const input = inputSchema.parse(raw); assertActive(signal);
  let setup: { nodeVersion: string; package: z.infer<typeof manifest>; files: string[] };
  if (input.mode === "current") {
    const packageJson = manifest.parse(JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8")));
    const files: string[] = [];
    for (const file of ["src/mastra/index.ts", "src/mastra/agents.ts", "package-lock.json"]) {
      try { await access(new URL("../" + file, import.meta.url)); files.push(file); } catch { /* Report missing fixed paths below. */ }
    }
    setup = { nodeVersion: process.versions.node, package: packageJson, files };
  } else setup = input;
  const checks = [
    { name: "Node 24+ course requirement", pass: Number(setup.nodeVersion.replace(/^v/, "").split(".")[0]) >= 24, fix: "Install a compatible Node runtime and reopen the terminal." },
    { name: "ES modules", pass: setup.package.type === "module", fix: 'Set package.json type to "module".' },
    { name: "Mastra runtime dependency", pass: Boolean(setup.package.dependencies["@mastra/core"]), fix: "Install the pinned @mastra/core dependency." },
    { name: "Start command", pass: Boolean(setup.package.scripts.start), fix: "Define the local start command." },
    ...["src/mastra/index.ts", "src/mastra/agents.ts", "package-lock.json"].map(file => ({ name: file, pass: setup.files.includes(file), fix: `Restore ${file} from the committed project.` })),
  ];
  emit({ type: "stage", text: `Checked ${checks.length} setup requirements using ${input.mode} evidence.` });
  return { status: checks.every(check => check.pass) ? "pass" : "needs-attention", summary: "Installation findings are separate from provider access. A credential-presence check is not a successful provider call.",
    data: { source: input.mode, nodeVersion: setup.nodeVersion, checks, registeredAgent: mastra.getAgent("tutor").id,
      provider: { model: modelId(), credentialPresent: credentialReady(modelId()), accessVerified: false }, studio: "npm run studio (selected port 4203; follow the printed address)" } };
}
export const liveModel = (_?: unknown) => modelId();
export async function executeLive(raw: unknown, question: string, emit: Emit, signal: AbortSignal, model?: AgentModel) {
  const report = await executeLab(raw, emit, signal);
  return generateAnswer(model ? createTutor(model) : mastra.getAgent("tutor"), `${question}\nPublic diagnostics: ${JSON.stringify(report.data)}`, emit, signal);
}
export async function dispose() {}
