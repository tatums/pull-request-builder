const result = require('./../lib/result')
const projectName = 'hello-world'
//const buildId = 'hello-world:87b05600-6098-45ec-9753-a03b9f2d617a'
const buildId = 'hello-world:4da734c1-c061-42f0-9099-79ae6af074b4'

result.run(buildId)
.then(resp => {
  console.log(resp)
})
.catch(err => {
  console.log(err)
})
