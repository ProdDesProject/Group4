
// get all channels

    const getChannels = async () => {
        try {
            const response = await fetch("http://193.196.53.33:3000/channels");
            const jsonData = await response.json();

            console.log("Channels: " + JSON.stringify(jsonData));
        } catch (err) {
            console.error(err.message);
        }
    };

// get users by username

    const getUserByUsername = async (username) => {
        try {
            const response = await fetch(`http://193.196.53.33:3000/users/${username}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            console.log("User already exists: " + JSON.stringify(jsonData.username))
        } catch (err) {
            createUser(username);
            console.error(err.message);
        }
    };

// create a new user

    const createUser = async (username) => {

        try {
            const body = { username };
            const response = await fetch("http://193.196.53.33:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            console.log("User created: " + JSON.stringify(jsonData.username));
        } catch (err) {
            console.error(err.message);
        }
    };

// get all users

    const getUsers = async () => {
        try {
            const response = await fetch("http://193.196.53.33:3000/users");
            const jsonData = await response.json();
            console.log("Users: " + JSON.stringify(jsonData))
        } catch (err) {
            console.error(err.message);
        }
    };

// create a user-channel connection

    const createUserChannels = async (username, channelname) => {
        try {
            const body = { username, channelname };
            const response = await fetch("http://193.196.53.33:3000/userchannels", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            console.log("User channel connection created: " + JSON.stringify(jsonData));
        } catch (err) {
            console.error(err.message);
        }
    };

// create a new message

    const createMessage = async (message) => {
        try {
            const body = message;
            console.log(JSON.stringify(body));
            const response = await fetch("http://193.196.53.33:3000/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            console.log("Message added: " + JSON.stringify(jsonData));
        } catch (err) {
            console.error(err.message);
        }
    };

    export default {
        getChannels,
        getUserByUsername,
        createUser,
        getUsers,
        createUserChannels,
        createMessage,
};