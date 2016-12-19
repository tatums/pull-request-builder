## CodeBuild with pull request builder

This will build out all the resources needed to use AWS codebuild and integrate
with a github to update the build result via githubs's status api.


Resources created IAM user with keys, SNS Topic, Lambda, CodeBuild Project

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
