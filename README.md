# TRAC-TCM

TRAC-TCM is a simple open source test case management tool.


# Overview #

This tool is intended to allow a software development team to document and track all test related activities within a project. This includes
the following testing related activities:

* Test Planning - document test plans and define resources needed for a project release or initiative
* Test Documentation - document a library of tests that need to be executed
* Test Estimation - document testing efforts and complexity for estimation purposes
* Test Execution - record results of executing tests against specific builds
* Test Reporting - track overall test execution progress and generate report artifacts


# Key Features #

This tool is intended to support the following major features:

* Multiple user accounts with Project level access
* Projects are used to ogranize artifacts for various project initiatives
* Plans can be used to organize various test planning efforts within a Project
* Suites can be used to organize your test library across all Plans within a Project
* Tests are used to document specific tests to be executed within a Suite
* Runs are used to document and track test execution within a specific Plan
* External API integration
    * status updates from automation or CI/CD pipeline
    * reporting exports for CI/CD pipeline integration
* Scalability and ease of deployment
    * Docker containers that can be used for deployment
    * Kubernetes deployment using Helm charts


**Note:** __most of these features are not yet implemented. This project is currently a basic prototype.__


# Technology #

This tool is built using the following technologies:

* TypeScript as the programming language (https://www.typescriptlang.org)
* MongoDB for database storage (https://www.mongodb.com)
* Data schema typing and object modeling using Mongoose (https://github.com/Automattic/mongoose)
* API server using Node Express (https://github.com/expressjs/express)
* React frontend components (https://github.com/facebook/react)
* User interface components using Chakra UI (https://chakra-ui.com)
* User interface icons using React Icons [Feather] (https://github.com/react-icons/react-icons)
* Microservice architecture and scaling using DAPR (https://dapr.io/)
* Automated UI testing using Cypress (https://cypress.io)

