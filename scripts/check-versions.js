const Repository = require('lerna/lib/Repository')

const repo = new Repository()
let warned = false

process.exit()

repo.packages.forEach(pkg => {
  const outdated = repo.packages
    .filter(p => !!pkg.allDependencies[p.name] && p.name !== pkg.name)
    .filter(p => !pkg.hasMatchingDependency(p))
  if (!outdated.length) {
    return
  }
  warned = true
  const msg = outdated
    .map(
      p => `Depends on "${p.name}@${pkg.allDependencies[p.name]}" \n
        instead of "${p.name}@${p.version}". \n`,
    )
    .join('\n')
  throw Error(`${pkg.name}: \n${msg}`)
})

if (warned) {
  process.exit(1)
}
