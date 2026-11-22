#!/usr/bin/env node
const { execSync } = require("child_process");

const REPO = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const GIT_COMMIT_RE = /(^|[;&|]\s*)git(\s+-C\s+\S+)?\s+commit(\s|$)/;

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let data;
  try {
    data = JSON.parse(input);
  } catch {
    process.exit(0);
  }

  const command = (data && data.tool_input && data.tool_input.command) || "";
  if (!GIT_COMMIT_RE.test(command)) process.exit(0);

  let branch = "";
  try {
    branch = execSync("git branch --show-current", { cwd: REPO }).toString().trim();
  } catch {
    process.exit(0);
  }

  if (branch === "main") {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason:
            'Commits directos en la rama "main" están bloqueados. Crea una rama (feature/..., bugfix/..., chore/...) con "git checkout -b <rama>" y vuelve a commitear ahí.',
        },
      }),
    );
  }
});
