import { defineConfig } from 'cypress'

export default defineConfig({
  reporterEnabled: 'spec, mocha-junit-reporter',
  mochaJunitReporterReporterOptions: {
    mochaFile: 'cypress/results/results-[hash].xml'
  }
})