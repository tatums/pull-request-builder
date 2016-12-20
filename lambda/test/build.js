const build = require('./../lib/build')

// TODO - move to an ENV var
const projectName = 'hello-world'
//const commit = '8956c8b8926331c743309f2f8eef3b471c72f515' // failure
const commit = 'dc996ad53fab6287fbd82dbe2310e1671e1c8b8e' // success

build.run(projectName, commit)
.then(resp => {
  console.log(resp)
})
.catch(err => {
  console.log(err)
})
