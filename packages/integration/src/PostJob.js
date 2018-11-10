const { connectDatabase, closeDatabase, SOURCE, Post } = require('@githubjobs/domain')
const { reddit, githubRepos, githubTrending, devblogs } = require('./services')
const logger = require('./logger')

const size = 20

module.exports = async () => {
  connectDatabase()
    .then(() => logger.info('✨  It has connected to database successfully!'))
    .catch(err => logger.error(err))

  const posts = Array.prototype.concat
    .apply(
      [],
      await Promise.all([
        reddit({ since: 'day', size }),
        githubRepos({ language: 'javascript', days: 1 }),
        githubTrending({ since: 'daily' }),
        devblogs({ source: SOURCE.BLOG_PERSONAL, size }),
        devblogs({ source: SOURCE.BLOG_TEAM, size }),
      ]),
    )
    .map(async post => {
      return Post.findOneAndUpdate(
        {},
        {
          $set: post,
          $setOnInsert: {
            created: new Date(),
          },
        },
        {
          setDefaultsOnInsert: true,
          upsert: true,
          new: true,
        },
      )
    })
  logger.info(`✨  ${posts.length} items has been inserted to database successfully!`)
  await closeDatabase()
}
