import { githubTrending, reddit, devblog } from 'blahblah-integration'

export async function getDevlog(ctx) {
  const start = Math.floor(Math.random() * Math.floor(20))
  ctx.body = await devblog(start, start + 30)
}
export async function getGitHubTrending(ctx) {
  ctx.body = await githubTrending()
}

export async function getReddit(ctx) {
  const options = {
    method: 'GET',
    body: {
      limit: 30,
      t: 'week',
    },
  }
  ctx.body = await reddit(options)
}
