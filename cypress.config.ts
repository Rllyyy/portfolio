import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "n3yjb3",
  e2e: {
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
