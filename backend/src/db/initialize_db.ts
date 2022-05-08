
const Project = require('../models/project')
const Plan = require('../models/plan')
const Suite = require('../models/suite')


const createPlan = (plan: typeof Plan) => {
    console.log("Creating "+ plan.name +" plan..")
    return plan.save((err: any, u: typeof Plan) => {
        if(err) return console.log(err) 
    })
}

const createDefaultPlans = (projectId: string) => {
    createPlan(new Plan({
        projectId: projectId,
        name: "v1.0 alpha",
        description: "This plan contains test artifacts for v1.0 alpha release.",
    }))

    createPlan(new Plan({
        projectId: projectId,
        name: "v1.0 beta",
        description: "This plan contains test artifacts for v1.0 beta release.",
    }))

    createPlan(new Plan({
        projectId: projectId,
        name: "v1.0",
        description: "This plan contains test artifacts for v1.0 final release.",
    }))

}

const createDefaultProject = () => {
    const project = new Project({
        name: "Default Project",
        description: "The default sample project that exist for new instances automatically.",
        content: "This project includes working configuration and sample data entries.",
        versions: ["v1.0.0"]
    })
    console.log("Creating default project..")
    project.save((err: any, u: typeof Project) => {
        if(err) return console.log(err) 
    })
    return project
}


const createSuite = (suite: typeof Suite) => {
    console.log("Creating "+ suite.name +" suite..")
    return suite.save((err: any, u: typeof Plan) => {
        if(err) return console.log(err) 
    })
}

const createDefaultSuites = (projectId: string) => {
    createSuite(new Suite({
        projectId: projectId,
        name: "Acceptance Tests",
        description: "These tests are used to validate that the software meets the business needs.",
    }))

    createSuite(new Suite({
        projectId: projectId,
        name: "Functional Tests",
        description: "These tests are used to verify that the software meets the functional requirements.",
    }))

    createSuite(new Suite({
        projectId: projectId,
        name: "Integration Tests",
        description: "These tests are used to verify that the software components work when integrated together.",
    }))

    createSuite(new Suite({
        projectId: projectId,
        name: "Performance Tests",
        description: "These tests are used to verify that the software performs as expected.",
    }))

    createSuite(new Suite({
        projectId: projectId,
        name: "Regression Tests",
        description: "These tests are used to make sure no unexpected changes have been introduced.",
    }))
}


const initializeDB = async () => {
    // Make sure we have a working project
    let project = await Project.findOne({})
    if (project === null) { 
        project = createDefaultProject()
        createDefaultPlans(project._id)
        createDefaultSuites(project._id)
    }
}


export default initializeDB
