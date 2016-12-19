const github = require('octonode')
const client = github.client(process.env.GITHUB_TOKEN)
const ghrepo = client.repo('tatums/aws-sam-example')

module.exports.update = (status, description, commit, buildId) => {
  return new Promise((resolve, reject) => {
    const url = `https://console.aws.amazon.com/codebuild/home?region=us-east-1#/builds/${buildId}/view/new`
    ghrepo.status(commit, {
      "state": status,
      "target_url": url,
      "description": description
    }, (err, data, headers) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
