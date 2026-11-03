import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 3,
  "title": "Installing Mastra and Bootstrapping a Project",
  "shortTitle": "Project bootstrap",
  "eyebrow": "INSTALL · CONFIGURE · VERIFY",
  "hero": "Diagnose your",
  "accent": "first project.",
  "description": "Run a scaffold doctor against this real project or a submitted project manifest. Fix the setup boundary before debugging model behavior.",
  "labTitle": "Run the bootstrap doctor",
  "labDescription": "Inspect this app's package, source entry points and Node runtime, or submit a deliberately broken scaffold manifest. Credentials are checked for presence only.",
  "localMode": "Actual project diagnostics · no model call",
  "defaultQuestion": "Explain the diagnostic findings and the next setup check to perform.",
  "objectives": [
    {
      "title": "Choose a compatible runtime",
      "text": "This application requires Node 24+. Check the package engines field and the selected CLI version rather than copying an old Node 18 baseline."
    },
    {
      "title": "Install reproducibly",
      "text": "npm ci uses the committed lockfile. The project includes real Mastra dependencies and a pinned CLI for its optional Studio command."
    },
    {
      "title": "Find the runtime entry",
      "text": "Inspect the actual src/mastra/index.ts export and registered bootstrap agent. A file that is never imported is not registration."
    },
    {
      "title": "Configure the provider locally",
      "text": "Create your own .env file. The key must match the selected provider; diagnostics expose a boolean, never the value."
    },
    {
      "title": "Check one stage at a time",
      "text": "Separate runtime, package, source-entry and model-access failures. A healthy page is not evidence that a provider call succeeded."
    },
    {
      "title": "Launch the developer workspace",
      "text": "npm run studio uses the pinned Mastra CLI. Follow its printed address; this course project selects port 4203."
    }
  ],
  "workflow": [
    "Choose current or submitted scaffold",
    "Read the bounded manifest",
    "Check the course Node requirement",
    "Check module and dependency setup",
    "Verify fixed source entry points",
    "Report next actions and readiness"
  ],
  "scope": "Current mode reads only this project's fixed public setup files. Submitted mode checks the JSON you supply. No arbitrary filesystem paths, shell execution or provider requests are accepted by the lab.",
  "examples": [
    {
      "name": "Inspect this installed project",
      "input": {
        "mode": "current"
      },
      "expected": "All required local setup checks pass; provider readiness is reported separately."
    },
    {
      "name": "Repair a broken scaffold",
      "input": {
        "mode": "submitted",
        "nodeVersion": "20.0.0",
        "package": {
          "type": "commonjs",
          "scripts": {},
          "dependencies": {}
        },
        "files": []
      },
      "expected": "Actionable runtime, module, dependency and entry-point findings."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/index.ts",
    "src/mastra/agents.ts"
  ],
  "exercise": "Use the broken manifest to correct one diagnostic at a time. Then compare it with the doctor's actual current-project report.",
  "checks": [
    {
      "question": "Does a missing model key make local installation invalid?",
      "answer": "The local lab can run without a model key. Provider access is a separate readiness check required for the live agent."
    },
    {
      "question": "Should a new generator overwrite an existing .env file?",
      "answer": "Preserve your existing local configuration. Copy the example only if the file is absent."
    },
    {
      "question": "Which Studio address should a student trust?",
      "answer": "The address printed by the running CLI, especially when a custom port is selected."
    }
  ],
  "docs": [
    {
      "title": "Mastra installation",
      "url": "https://mastra.ai/docs/getting-started/installation"
    },
    {
      "title": "Mastra Studio",
      "url": "https://mastra.ai/docs/getting-started/studio"
    }
  ],
  "readmeWorkflow": [
    {
      "step": "Choose evidence",
      "component": "src/lab.ts",
      "behavior": "Current mode reads only this project’s fixed manifest and entry paths; submitted mode uses the supplied JSON."
    },
    {
      "step": "Check runtime and package",
      "component": "src/lab.ts",
      "behavior": "Check Node 24+, ESM, @mastra/core, start script and lockfile."
    },
    {
      "step": "Check registration",
      "component": "src/mastra/index.ts",
      "behavior": "Inspect the real bootstrap tutor registration."
    },
    {
      "step": "Report findings",
      "component": "src/lab.ts",
      "behavior": "Return individual pass/fail checks and credential-presence readiness separately."
    }
  ],
  "liveWorkflow": [
    "The actual doctor runs first.",
    "Its public findings are passed to the registered tutor for an explanation."
  ],
  "outcomeNotes": [
    "The broken manifest exposes individual setup fixes.",
    "A present credential does not prove provider account access.",
    "npm run studio uses mastra dev; server.port in src/mastra/index.ts selects 4203."
  ]
} satisfies LessonMetadata;
