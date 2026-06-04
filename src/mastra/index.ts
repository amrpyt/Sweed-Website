import { Mastra } from "@mastra/core/mastra";
import { InMemoryStore, MastraCompositeStore } from "@mastra/core/storage";
import { MastraEditor } from "@mastra/editor";
import { LibSQLStore } from "@mastra/libsql";
import { closeSync, mkdirSync, openSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { PinoLogger } from "@mastra/loggers";
import { FileTransport } from "@mastra/loggers/file";
import { sweedStudioAdvisorAgent } from "./agents/sweed-advisor";

const localStorageDir = resolve(process.env.INIT_CWD ?? process.cwd(), ".mastra-data");
mkdirSync(localStorageDir, { recursive: true });
const localLogPath = resolve(localStorageDir, "sweed-studio.log");
closeSync(openSync(localLogPath, "a"));

const localStorageUrl =
  process.env.MASTRA_STORAGE_URL ??
  pathToFileURL(resolve(localStorageDir, "sweed-studio.db")).href;
const durableStorage = new LibSQLStore({
  id: "sweed-mastra-storage",
  url: localStorageUrl,
});
const localObservabilityStorage = new InMemoryStore({ id: "sweed-mastra-observability" });

export const mastra = new Mastra({
  agents: {
    sweedAdvisor: sweedStudioAdvisorAgent,
  },
  storage: new MastraCompositeStore({
    id: "sweed-mastra-composite-storage",
    default: durableStorage,
    domains: {
      observability: localObservabilityStorage.stores?.observability,
    },
  }),
  logger: new PinoLogger({
    name: "sweed-mastra",
    level: "info",
    transports: {
      file: new FileTransport({ path: localLogPath }),
    },
  }),
  editor: new MastraEditor(),
});
        
