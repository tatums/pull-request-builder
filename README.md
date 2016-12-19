## CodeBuild with pull request builder

This will build out all the resources needed to use
[AWS codebuild](https://aws.amazon.com/codebuild/) and integrate
with a github to update the build result via githubs's status api.


Resources created

* CodeBuild Project
* SNS Topic
* Lambda
* IAM user with keys


When a commit is pushed to github.  Github sends a SNS message
which then invokes the Lambda. The lambda will update github
via the status api and set the status to pending. The last step
of codebuild with invoke the lambda again to trigger the result.


## Setup ENV variables

```
$ export GITHUB_TOKEN='1234567890'
$ export PROJECT_NAME='foo-bar'
```

## Create the resources
```
$ ./create
```

## Update the resources
```
$ ./update
```

## Deploy the lambda
```
$ npm install && npm run aws:fn-deplo
```
