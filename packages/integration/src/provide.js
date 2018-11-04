const { connectDatabase, Post } = require('@githubjobs/domain')
const { reddit, githubRepos, githubTrending, devblogs } = require('./services')
const logger = require('./logger')

const size = 20

connectDatabase()
  .then(() => logger.info('✨  It has connected to database successfully!'))
  .catch(err => logger.error(err))

async function provide() {
  const values = await Promise.all([
    reddit({ since: 'week', size }),
    githubRepos({ language: 'javascript' }),
    githubTrending({ since: 'weekly' }),
    devblogs({ category: 'personal', size }),
    devblogs({ category: 'team', size }),
  ])
  const collections = []
  values.forEach(value => Array.prototype.push.apply(collections, value))
  collections.forEach(async item => {
    const post = new Post({
      ...item,
    })
    return post.save()
  })
  logger.info(`✨  ${collections.length} items has been inserted to database successfully!`)
}

provide()
  .then(() => process.exit(0))
  .catch(err => logger.error(err))
