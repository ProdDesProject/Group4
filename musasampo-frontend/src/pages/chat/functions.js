
    const getChannels = async () => {
        try {
            const response = await fetch("http://localhost:5000/channels");
            const jsonData = await response.json();
            for (var i = 0; i < jsonData.length; i++)
                this.setState({
                    channels: [
                        ...this.state.channels,
                        jsonData[i].channelname
                    ]
                })
            console.log("Channels: " + jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUserByUsername = async (username) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${username}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            console.log("User already exists: " + jsonData.username)
        } catch (err) {
            createUser(username);
            console.error(err.message);
        }
    };

    const createUser = async (username) => {

        try {
            const body = { username };
            const response = await fetch("http://localhost:5000/users", {
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

    export default {
        getChannels,
        getUserByUsername,
        createUser
};