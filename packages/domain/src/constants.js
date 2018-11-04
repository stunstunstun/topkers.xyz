const SERVICE_TYPE = Object.freeze({
  GITHUB: 'GITHUB',
  FACEBOOK: 'FACEBOOK',
})

const SOURCE = Object.freeze({
  REDDIT: 'reddit',
  GITHUB_REPOS: 'github.repos',
  GITHUB_TRENDING: 'github.trending',
  DEVBLOGS_PERSONAL: 'devblogs.personal',
  DEVBLOGS_TEAM: 'devblogs.team',
})

module.exports = {
  SERVICE_TYPE,
  SOURCE,
}
