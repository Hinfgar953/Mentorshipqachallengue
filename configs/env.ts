import dotenv from "dotenv";
import path from "path";

export const TEST_ENV = process.env.TEST_ENV ?? "myenvironment";

const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.resolve(projectRoot, `.env.${TEST_ENV}`), quiet: true });
dotenv.config({ path: path.resolve(projectRoot, ".env.local"), quiet: true });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing variable ${name} for TEST_ENV="${TEST_ENV}". Set it in the process environment or the project's .env.${TEST_ENV} file.`,
    );
  }
  return value;
}

export const env = {
  name: TEST_ENV,
  get uiBaseUrl() {
    return required("UI_BASE_URL");
  },
  get apiBaseUrl() {
    return required("API_BASE_URL");
  },
  get actionTimeout() {
    return Number(required("UI_TIMEOUT"));
  },

  //getters: the credentials are only read when a test uses them, so the unit tests do not need them
  get ui() {
    return { username: required("UI_USERNAME"), password: required("UI_PASSWORD") };
  },
  get api() {
    return { username: required("API_USERNAME"), password: required("API_PASSWORD") };
  },
};
