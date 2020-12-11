const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
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

//get a channel

app.get("/channels/:channelid", async (req, res) => {
  try {
    const { channel_id } = req.params;
    const channel = await pool.query("SELECT * FROM channels WHERE channel_id = $1", [
      channel_id
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

//get user by user_id

app.get("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a message

app.post("/messages", async (req, res) => {
  try {
    const { messagecontent, user_id, channel_id } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (messagecontent, user_id, channel_id) VALUES($1,$2,$3) RETURNING *",
      [messagecontent, user_id, channel_id]
    );

    res.json(newMessage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all messages by channel

app.get("/messages/channel_id", async (req, res) => {
  try {
    const { channel_id } = req.params;
    const allUsers = await pool.query("SELECT * FROM messages WHERE channel_id = $1",
    [channel_id]
    );
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// create user channel connection

app.post("/userchannels", async (req, res) => {
  try {
    const {user_id, channel_id } = req.body;
    const newConnection = await pool.query(
      "INSERT INTO user_channels (user_id, channel_id) VALUES($1,$2) ON CONFLICT(user_id, channel_id) DO NOTHING RETURNING * ",
      [user_id, channel_id]
    );

    res.json(newConnection.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all channels by user

app.get("/userchannels/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const allUsers = await pool.query("SELECT * FROM channels WHERE channel_id IN (SELECT channel_id FROM user_channels WHERE user_id = $1)",
    [user_id]
    );


    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//delete user channel connection

app.delete("/userchannels", async (req, res) => {
  try {
    const { user_id, channel_id } = req.body;
    const deleteConnection = await pool.query("DELETE FROM user_channels WHERE user_id = $1 AND channel_id = $2 ", [
      user_id, channel_id
    ]);

    res.json("Channel was deleted: " + deleteConnection);
  } catch (err) {
    console.log(err.message);
  }
});



app.listen(5000, () => {
  console.log("server has started on port 5000");
});
