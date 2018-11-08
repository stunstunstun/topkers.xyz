const { connectDatabase, SOURCE, Post } = require('@githubjobs/domain')
const { reddit, githubRepos, githubTrending, devblogs } = require('./services')
const logger = require('./logger')

const size = 20

module.exports = async () => {
  connectDatabase()
    .then(() => logger.info('✨  It has connected to database successfully!'))
    .catch(err => logger.error(err))

  const posts = Array.prototype.concat.apply(
    [],
    await Promise.all([
      reddit({ since: 'week', size }),
      githubRepos({ language: 'javascript' }),
      githubTrending({ since: 'weekly' }),
      devblogs({ source: SOURCE.DEVBLOGS_PERSONAL, size }),
      devblogs({ source: SOURCE.DEVBLOGS_TEAM, size }),
    ]),
  )
  const results = await Post.insertMany(posts)
  logger.info(`✨  ${results.length} items has been inserted to database successfully!`)
  await closeDatabase()
}
