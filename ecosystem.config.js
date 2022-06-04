module.exports = {
  apps : [
    { 
      name   : "frontend",
      script : "npm",
      exec_mode: "cluster",
      args: "run serve",
      cwd: "./frontend"
    },
    { 
      name   : "backend",
      script : "npm",
      args: "run serve",
      exec_mode: "cluster",
      cwd: "./backend"
    }
  ]
}
