const pool = require("./db");

  module.exports = {
    
    userExists: async (username) => {
        const client = await pool.connect()
        try {
        const queryText = 'SELECT * FROM users where username = $1'
          // const queryText = 'INSERT INTO channels(channelname) VALUES($1)'
          const res = await client.query(queryText, [username])
          if (res.length){
            console.log(res.rows[0])
            return true
          }else{
              console.log("false")
              return false
          }
    
        } catch (e) {
          throw e
        } finally {
          client.release()
        }
      },

      foo: async (evt, callback) => {
        // do something with evt
        // return response with callback
      }

}

    