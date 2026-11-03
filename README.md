# Mastra · Lesson 03 · Installing Mastra and Bootstrapping a Project

Run a scaffold doctor against this real project or a submitted project manifest. Fix the setup boundary before debugging model behavior.

![Lesson 03 application](docs/application-preview.png)

## What this application does

Inspect this app's package, source entry points and Node runtime, or submit a deliberately broken scaffold manifest. Credentials are checked for presence only.

**Practical mode:** Actual project diagnostics · no model call.

Current mode reads only this project's fixed public setup files. Submitted mode checks the JSON you supply. No arbitrary filesystem paths, shell execution or provider requests are accepted by the lab.

## Run the application

Use **Node.js 24+**. Each lesson is an independent repository with its own dependency lockfile.

```powershell
git clone https://github.com/luiscoco/Udemy-Mastra-lesson03-app.git
cd Udemy-Mastra-lesson03-app
npm ci
npm start
```

Open **http://127.0.0.1:3203** and choose **Run practical lab**. The practical operation requires no model key. Starting the server does not make a provider request. Keep the terminal open; Ctrl+C stops it. To change the port, set PORT in the environment or local .env file.

## Application pages

| Page | Content |
| --- | --- |
| Application lab | Editable JSON cases, actual execution, formatted result, event log and structured metadata |
| What you will learn | Lesson objectives, comprehension checks and a concrete exercise |
| How to run | Installation, local/live modes, commands and troubleshooting |
| Architecture & workflow | The practical execution sequence and the actual request runner |
| Code walkthrough | Source-derived excerpts with GitHub line references |

The application supports light/dark themes, mobile layouts, sanitized Markdown, syntax-highlighted code and copy-code controls.

## Practical execution workflow

| Stage | Source | Actual behavior |
| --- | --- | --- |
| Choose evidence | [src/lab.ts](src/lab.ts) | Current mode reads only this project’s fixed manifest and entry paths; submitted mode uses the supplied JSON. |
| Check runtime and package | [src/lab.ts](src/lab.ts) | Check Node 24+, ESM, @mastra/core, start script and lockfile. |
| Check registration | [src/mastra/index.ts](src/mastra/index.ts) | Inspect the real bootstrap tutor registration. |
| Report findings | [src/lab.ts](src/lab.ts) | Return individual pass/fail checks and credential-presence readiness separately. |

The browser posts JSON to **POST /api/lab**. The host validates the envelope, runs the lesson implementation and sends NDJSON events. The UI renders the actual result and a separate application outcome. **GET /api/config** exposes public lesson metadata and credential-presence readiness, never credential values.

## Classroom cases and expected outcomes

### 1. Inspect this installed project

```json
{
  "mode": "current"
}
```

**Expected:** All required local setup checks pass; provider readiness is reported separately.

### 2. Repair a broken scaffold

```json
{
  "mode": "submitted",
  "nodeVersion": "20.0.0",
  "package": {
    "type": "commonjs",
    "scripts": {},
    "dependencies": {}
  },
  "files": []
}
```

**Expected:** Actionable runtime, module, dependency and entry-point findings.

## Interpreting the result

- The broken manifest exposes individual setup fixes.
- A present credential does not prove provider account access.
- npm run studio uses mastra dev; server.port in src/mastra/index.ts selects 4203.

**Complete** means the operation met its implemented completion checks. **Needs attention** exposes a business, format or validation finding. **Could not finish** is an execution/request failure. **Cancelled** is a separate user action. Read the evidence before treating any runtime status as task correctness.

## Optional live-agent workflow

1. The actual doctor runs first.
2. Its public findings are passed to the registered tutor for an explanation.

The live button uses **POST /api/query** and a real provider, and may incur API usage. Tests use an explicit SDK model adapter; no paid provider call is claimed by the test evidence.

Configure your own credentials locally, preserving any existing .env:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

```dotenv
# Set your own provider credential locally. No credential is copied from another app.
OPENAI_API_KEY=your_api_key
MASTRA_MODEL=openai/gpt-4.1-mini
PORT=3203
```

Choose a model your account can access and restart the server. Credentials remain on the host and are ignored by Git. Existing shell values take precedence over the optional .env file. Provider/model availability and supported parameters must be checked for your selected model.

## Mastra Studio

```powershell
npm run studio
```

This executes the pinned Mastra CLI with **mastra dev**. The exported Mastra instance in **src/mastra/index.ts** configures **server.port=4203**; follow the URL printed by the running CLI. Studio runs separately from the student application. The bootstrap tutor is available through the actual registry.

## Build, samples and verification

```powershell
npm run sample
npm run build
npm test
npm run test:browser
```

- **sample:** executes the default practical case without a provider key.
- **sample:live:** runs an actual provider request after configuration; invoke separately with npm run sample:live.
- **build:** regenerates all five pages, actual-source excerpts, architecture SVG, this README and the browser bundle.
- **test:** typechecks and runs offline local-operation, invalid-input, cancellation, real-SDK adapter, generated-content and HTTP-boundary checks, plus lesson-specific regression cases.
- **test:browser:** uses isolated headless Chrome to execute the real practical lab and its failure case, verify all five pages and mobile layout, check theme persistence, syntax colors and safe Markdown, and save [browser evidence](docs/browser-qa.json). The live-renderer fixture makes no provider request.

Set BROWSER_EXECUTABLE if Chrome/Chromium is not installed at the platform’s standard path. Browser tests are local; GitHub Actions runs npm ci, build and the offline test suite.

## Dependencies

| Runtime package | Pinned version |
| --- | --- |
| @mastra/core | 1.81.0 |
| dompurify | 3.4.17 |
| marked | 18.1.3 |
| zod | 4.6.7 |

The Studio CLI is pinned to **mastra 1.37.0**.

The committed package-lock.json fixes the installed dependency tree. A remote model alias is independent of the JavaScript lockfile.

## Student exercise

Use the broken manifest to correct one diagnostic at a time. Then compare it with the doctor's actual current-project report.

Rebuild after a source change so the explanation pages, line references and README remain consistent with the running code.

## Source and references

- [src/lab.ts](src/lab.ts)
- [src/mastra/index.ts](src/mastra/index.ts)
- [src/mastra/agents.ts](src/mastra/agents.ts)
- [HTTP host](src/server.ts)
- [Execution envelope](src/runner.ts)
- [Page and README generator](scripts/build-pages.ts)
- [Mastra installation](https://mastra.ai/docs/getting-started/installation)
- [Mastra Studio](https://mastra.ai/docs/getting-started/studio)

Prism’s license is included in [public/prism-LICENSE.txt](public/prism-LICENSE.txt).
