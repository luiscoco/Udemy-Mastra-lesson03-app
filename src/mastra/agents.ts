import { makeAgent, type AgentModel } from "../core.js";
export const instructions = "Explain bootstrap diagnostics from supplied public findings. Separate Node, package, entrypoint and provider-access issues. Never request credentials. Use Markdown and fenced code.";
export function createTutor(model?: AgentModel) { return makeAgent("lesson-3-tutor", "Lesson 3 tutor", instructions, model); }
export const tutor = createTutor();
