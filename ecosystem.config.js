module.exports = {
  apps : [
    { 
      name   : "backend",
      script : "npm",
      automation: false,
      args: "run-script dev",
      cwd: "./backend"
    },
    { 
      name   : "frontend",
      script : "npm",
      automation: false,
      args: "run-script start",
      cwd: "./frontend"
    },
  ]
}
