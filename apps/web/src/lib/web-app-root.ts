import { resolve } from "node:path";

export function getWebAppRoot() {
  return resolve(process.env.SWEED_WORKSPACE_ROOT ?? process.cwd());
}
