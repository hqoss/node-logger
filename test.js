const { stdout, stderr } = require("process")

const level = "info"
const message = "Something happened here"
const chunks = []

const correlationId = "abc-123"

const metadata = new Map(Object.entries({
  ...{ something: "else" },
  app: "app@version",
  correlationId
}));


for (const [key, value] of metadata) {
  chunks.push(`${key}=${value}`)
}

chunks.push(`[${level}]`)
chunks.push(message)

const line = Buffer.concat([Buffer.from(chunks.join(" ")), Buffer.from("\n")])

stdout.write(line)
stdout.write(line)
stderr.write(line)
stdout.write(line)
