const cron = require('node-cron')
const PostJob = require('./PostJob')

cron.schedule('0 0 * * *', async () => {
  await PostJob()
})
