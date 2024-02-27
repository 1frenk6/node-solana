import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import tsconfigJson from "./tsconfig.json";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }]
  },
  testRegex: "__tests__/integrations/*/.*.spec.ts$",
  setupFiles: ["<rootDir>/__tests__/integrations/__configs__/jest/globalSetup.ts"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/integrations/__configs__/jest/setupFilesAfterEnv.ts"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, {
    prefix: "<rootDir>/"
  }),
  testPathIgnorePatterns: ["<rootDir>/.build/*"]
};

export default config;
