
 const pool = require("./db");

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
