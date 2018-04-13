require("ts-node/register")
;(async () => {
  const connectResult = await require("../src/db/connect").default({
    uri: "mongodb://localhost:27017",
    dbName: "all-seeing-wizards"
  })
  global.db = connectResult.db

  const GameManager = require("../src/state/gameManager").default
  global.gameManager = new GameManager(db)

  require("await-repl")()
})()
