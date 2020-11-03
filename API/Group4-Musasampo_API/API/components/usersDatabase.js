const {
    v4: uuidv4
} = require('uuid');

let users = [{
        userId: "1",
        username: 'tester',
        password: '$2y$06$PhZ74dT8/5g6B8SgssFq6ey4ojLxmP6pos2DcevMUGw25Vc9jGEou', // testerpassword
        email: 'oof@gmail.com'
    },
    {
        userId: "2",
        username: "johndoe",
        password: '$2y$06$eQav1OaIyWSUnlvPSaFXRe5gWRqXd.s9vac1SV1GafxAr8hdmsgCy', // johndoepassword
        email: 'oof@gmail.com'
    },
];

module.exports = {

    // Function to find an user by id
    getUserById: (userId) => users.find(u => u.userId == userId),

    // Function to find an user by username
    getUserByName: (username) => users.find(u => u.username == username),

    // Function to add a new user to the database
    addUser: (username, password) => {
        users.push({
            userId: uuidv4(),
            username,
            password
        });
    },

    // Function to check if an user with the same username is already existing in the database
    existsUsername(username) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                return true;
            }
        }

        return false;
    },

    // Function to check if an email with the same email address is already existing in the database
    existsEmail(email) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                return true;
            }
        }

        return false;
    }

}