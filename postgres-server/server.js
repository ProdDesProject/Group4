const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const bodyParser = require('body-parser');

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//create a channel

app.post("/channels", async (req, res) => {
  try {
    const { channelname } = req.body;
    const newChannel = await pool.query(
      "INSERT INTO channels (channelname) VALUES($1) RETURNING *",
      [channelname]
    );

    res.json(newChannel.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all channels

app.get("/channels", async (req, res) => {
  try {
    const allChannels = await pool.query("SELECT * FROM channels");
    res.json(allChannels.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a channel by name

app.get("/channels/:channelid", async (req, res) => {
  try {
    const { channelname } = req.params;
    const channel = await pool.query("SELECT * FROM channels WHERE channelname = $1", [
      channelname
    ]);

    res.json(channel.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a user

app.post("/users", async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username) VALUES($1) RETURNING *",
      [username]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all users

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get user by username

app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get user by username

app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a message

app.post("/messages", async (req, res) => {
  try {
    const {message_id, messagecontent, username, channelname } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (message_id, messagecontent, username, channelname) VALUES($1,$2,$3,$4) RETURNING *",
      [message_id, messagecontent, username, channelname]
    );

    res.json(newMessage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get messages by up to 5 channels

app.get("/messages/:username", async (req, res) => {
  try {
    const { username} = req.params;

    const allUsers = await pool.query("SELECT * FROM messages WHERE channelname IN (SELECT channelname FROM user_channels WHERE username = $1)",
    [username]
    );
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// create user channel connection

app.post("/userchannels", async (req, res) => {
  try {
    const {username, channelname } = req.body;
    const newConnection = await pool.query(
      "INSERT INTO user_channels (username, channelname) VALUES($1,$2) ON CONFLICT(username, channelname) DO NOTHING RETURNING * ",
      [username, channelname]
    );

    res.json(newConnection.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all channels by user

app.get("/userchannels/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const allUsers = await pool.query("SELECT * FROM channels WHERE channelname IN (SELECT channelname FROM user_channels WHERE username = $1)",
    [username]
    );


    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//delete user channel connection

app.delete("/userchannels", async (req, res) => {
  try {
    const { username, channelname } = req.body;
    const deleteConnection = await pool.query("DELETE FROM user_channels WHERE username = $1 AND channelname = $2 ", [
      username, channelname
    ]);

    res.json("Channel was deleted: " + deleteConnection);
  } catch (err) {
    console.log(err.message);
  }
});


let apiInstance = null;

exports.start = () => {
    apiInstance = app.listen(PORT, HOST)
    console.log(`Example app listening at http://${HOST}:${PORT}`)
}

exports.stop = () => {
    apiInstance.close();
}
