
// returns the time if postgres database is up

 const pool = require("./db");

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
