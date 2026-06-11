import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const rootMarkers = ["package.json", "site"];

export function getWorkspaceRoot() {
  const candidates = [
    process.env.SWEED_WORKSPACE_ROOT,
    process.cwd(),
    resolve(process.cwd(), "../.."),
  ].filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of candidates) {
    const root = resolve(candidate);
    if (rootMarkers.every((marker) => existsSync(join(root, marker)))) {
      return root;
    }
  }

  return process.cwd();
}
