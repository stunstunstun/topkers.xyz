const SERVICE_TYPE = Object.freeze({
  GITHUB: 0,
  EMAIL: 1,
})

const SOURCE = Object.freeze({
  REDDIT: 0,
  GITHUB_REPOS: 1,
  GITHUB_TRENDING: 2,
  DEVBLOGS_PERSONAL: 3,
  DEVBLOGS_TEAM: 4,
})

module.exports = {
  SERVICE_TYPE,
  SOURCE,
}
