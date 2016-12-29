'use strict';

const result = require('./lib/result')
const build = require('./lib/build')

exports.handler = (event, context, callback) => {

  const message = JSON.parse(event.Records[0].Sns.Message)

  console.log("\n\n", message, "\n\n");

  if (message && message.after) {

    console.log('\n\n ====== BUILDING ======= \n\n')
    build.run(message.after)
      .then(resp => {
        callback(null, resp);
      })
      .catch(err => {
        callback(err, null);
      })

  } else {

    console.log('\n\n ====== REPORTING ======= \n\n')
    result.run(message.buildId)
      .then(resp => {
        callback(null, resp);
      })
      .catch(err => {
        callback(err, null);
      })

  }

}
