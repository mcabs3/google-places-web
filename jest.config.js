module.exports = {
  verbose: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFiles: ['dotenv/config', "./src/setupTests.ts"]
};
