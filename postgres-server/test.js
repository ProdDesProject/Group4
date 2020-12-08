
  const { Pool } = require('pg')
  const pool = new Pool({
    user: 'postgres',
    host: '193.196.53.33',
    database: 'messenger',
    password: 'admin',    
    port: 5416,
    
  })

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
