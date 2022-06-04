import { defineConfig } from "cypress";

export default defineConfig({
  // component: {
  //   devServer: {
  //     framework: "create-react-app",
  //     bundler: "webpack",
  //   },
  // },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    mochaFile: 'cypress/results/test-results-[hash].xml',
    reporterEnabled: 'spec, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/results/results-[hash].xml'
    }
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFolder: "support"
  },
})
