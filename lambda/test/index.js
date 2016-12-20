const index = require('../index')

const event = {
  'Records': [
    {
      'Sns': {
        'Message': "{\"buildId\": \"hello-world:87b05600-6098-45ec-9753-a03b9f2d617a\"}"
      }
    }
  ]
}
const cb = function (success, error) {
  console.log('Success', success);
  console.log('Error', success);
}

index.handler(event, {}, cb)
