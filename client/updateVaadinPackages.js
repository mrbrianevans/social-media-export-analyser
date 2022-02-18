import fs from 'fs'
import { execSync } from 'child_process'

const packageJson = fs.readFileSync('./package.json').toString()
const packageObj = JSON.parse(packageJson)

const vaadinDeps = packageObj.dependencies

for (const [packageName, version] of Object.entries(vaadinDeps)) {
  if (packageName.startsWith('@vaadin')) {
    console.log(packageName, version)
    const output = execSync(`npm install ${packageName}@next`)
    const alreadyUpdated = output.toString().trim().startsWith('up to date')
    console.log(
      alreadyUpdated ? 'Already up to date' : 'Updated to newer version'
    )
  }
}
