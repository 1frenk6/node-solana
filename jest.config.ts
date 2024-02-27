import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import tsconfigJson from "./tsconfig.json";

const jestUnit: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }]
  },
  setupFiles: ["<rootDir>/__tests__/unit/__configs__/jest/globalSetup.ts"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/unit/__configs__/jest/setupFilesAfterEnv.ts"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, {
    prefix: "<rootDir>/"
  }),
  testPathIgnorePatterns: ["<rootDir>/.build/*", "<rootDir>/__tests__/integrations/*"],
  collectCoverageFrom: [
    "**/**/{!(custom.d),}.ts",
    "!**/**/*.spec.ts",
    "!**/**/types/*.ts",
    "!**/**/src/index.ts",
    "!**/**/**/migrate.ts",
    "!**/**/**/tables/*.ts",
    "!**/**/**/commands/*.ts",
    "!services/**/handler.ts",
    "!components/middleware/index.ts"
  ],
  coveragePathIgnorePatterns: [
    "jest.*",
    "<rootDir>/.build/*",
    "<rootDir>/*/__tests__/*",
    "<rootDir>/__mockutils__/*",
    "<rootDir>/components/database/migrations/*",
    "local/*",
    "<rootDir>/__events__/*"
  ],
  coverageReporters: ["lcov", "text"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80
    }
  },
  testResultsProcessor: "jest-sonar-reporter"
};

export default jestUnit;
