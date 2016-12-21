## CodeBuild with pull request builder

This will build out all the resources needed to use
[AWS codebuild](https://aws.amazon.com/codebuild/) and integrate
with a github to make a pull request builder.

When a commit is pushed to github.  Github sends a SNS message
which then invokes the Lambda. The lambda will update github
via the status api and set the status to pending. The last step
of codebuild will invoke the lambda again to report the build result.

Cloudformation will output the keys and SNS ARN needed for the
github AWS SNS integration.


## Setup

### Requirements

#### ENV Varialbes

```
$ export GITHUB_PROJECT_NAME='tatums/hello-world'
$ export GITHUB_TOKEN='1234567890'
$ export PROJECT_NAME='foo-bar'
```
#### AWS Cli

This relies on the [aws cli](https://aws.amazon.com/cli/). Make sure you're setup

#### [Setup resources](./resources/README.md)
```bash
$ ./resources/create
```

This will create the following resources in AWS

* CodeBuild Project
* SNS Topic
* Lambda
* IAM user with keys (for the github integration)

### Deploy the lambda
```
$ cd lambda
$ npm install && npm run deploy
```

### Your project will need to setup a `buildspec.yml` file.

[CodeBuild buildspec docs](http://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)

Notice that you'll need to trigger a SNS call in the post_build step.


```YAML
version: 0.1

environment_variables:
  plaintext:
    SNS_TOPIC_ARN: arn:aws:sns:us-east-1:012345678902:pull-request-builder

phases:
  install:
    commands:
      - echo Nothing to do in the install phase...
  pre_build:
    commands:
      - npm install
  build:
    commands:
      - echo Build started on `date`
      - npm test
  post_build:
    commands:
      - echo Build completed on `date`
      - 'aws sns publish --topic-arn arn:aws:sns:us-east-1:012345678902:pull-request-builder --message "{\"buildId\": \"$CODEBUILD_BUILD_ID\"}"'
```
