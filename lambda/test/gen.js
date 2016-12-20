const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' });
const codebuild = new AWS.CodeBuild()
const buildId = 'hello-world:4da734c1-c061-42f0-9099-79ae6af074b4'
const promiseRetry = require('promise-retry');


greenStatus = function() {
  return new Promise((resolve, reject) => {
    codebuild.batchGetBuilds({ ids: [ buildId ] }, (err, data) => {
      var build = data.builds[0]
      if (build.buildStatus == 'SUCCEEDED') {
        resolve(build)
      } else {
        reject(false)
      }
    })
  })
}

promiseRetry(function (retry, number) {
    console.log('attempt number', number);
    return greenStatus()
    .catch(retry);
})
.then(function (resp) {
  console.log(resp);
    // ..
}, function (err) {
    // ..
});



