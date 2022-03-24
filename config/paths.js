const path = require("path")

const appDir = process.cwd()

exports.resolvePath = (relative) => path.resolve(appDir, relative)