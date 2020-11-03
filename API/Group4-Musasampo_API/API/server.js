const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const bcrypt = require('bcryptjs');
const errorHandler = require('./components/errorHandler');

app.use(bodyParser.json());
app.use(express.json());


/**
 *  import database and functions for user and item object
 */

const itemsDatabase = require('./components/itemsDatabase.js');
const usersDatabase = require('./components/usersDatabase.js');


/**
 *  Variables for imageUpload
 */

const uploadConfig = require('./components/uploadConfig');


app.get('/', (req, res) => {
    res.send('Hello World!')
})


/*********************************************
 * HTTP Basic Authentication
 * Passport module used
 * http://www.passportjs.org/packages/passport-http/
 ********************************************/

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function (username, password, done) {

        const user = usersDatabase.getUserByName(username);
        if (user == undefined) {
            // Username not found
            console.log("HTTP Basic username not found");
            return done(null, false, {
                message: "HTTP Basic username not found"
            });
        }

        /* Verify password match */
        if (bcrypt.compareSync(password, user.password) == false) {
            // Password does not match
            console.log("HTTP Basic password not matching username");
            return done(null, false, {
                message: "HTTP Basic password not found"
            });
        }
        return done(null, user);
    }
));


/*********************************************
 * JWT authentication
 * Passport module is used, see documentation
 * http://www.passportjs.org/packages/passport-jwt/
 ********************************************/

const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('./components/jwt-key.json');


let options = {}

/* Configure the passport-jwt module to expect JWT
   in headers from Authorization field as Bearer token */
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

/* This is the secret signing key.
   You should NEVER store it in code  */
options.secretOrKey = jwtSecretKey.secret;

passport.use(new JwtStrategy(options, function (jwt_payload, done) {
    //console.log("Processing JWT payload for token content:");
    //console.log(jwt_payload);


    /* Here you could do some processing based on the JWT payload.
    For example check if the key is still valid based on expires property.
    */
    const now = Date.now() / 1000;
    if (jwt_payload.exp > now) {
        done(null, jwt_payload.user);
    } else { // expired
        done(null, false);
    }
}));


/*
POST /login
User logs in with username and password
 */

app.post(
    '/login',
    passport.authenticate('basic', {
        session: false
    }),
    (req, res) => {
        const body = {
            userId: req.user.userId,
            username: req.user.username,
            password: req.user.password
        };

        const payload = {
            user: body
        };

        const options = {
            expiresIn: '1d'
        }

        /* Sign the token with payload, key and options.
           Detailed documentation of the signing here:
           https://github.com/auth0/node-jsonwebtoken#readme */
        const token = jwt.sign(payload, jwtSecretKey.secret, options);

        return res.json({
            token
        });

    })


/*
POST /users/create
Create a new user
 */
app.post('/users/create',
    (req, res) => {

        if (!req.body.password) {
            return res.status(400).json({
                "message": "Password missing."
            })
        } else if (!req.body.username) {
            return res.status(400).json({
                "message": "Username missing."
            })
        } else if (!req.body.email) {
            return res.status(400).json({
                "message": "Email missing."
            })
        }

        //Check if username already exists
        if (usersDatabase.existsUsername(req.body.username) === true) {
            return res.status(409).json({
                "message": "Username already exists."
            });
        }

        if (usersDatabase.existsEmail(req.body.email) === true) {
            return res.status(409).json({
                "message": "The given email is already assigned to an other account."
            });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 6);
        console.log(hashedPassword);
        // call function to add user to database
        usersDatabase.addUser(req.body.username, hashedPassword, req.body.email);

        res.status(201).json({
            status: "User successfully created"
        });
    });



/*
POST /items/create
Create a new item
 */

app.post('/items/create', passport.authenticate('jwt', {
    session: false
}), uploadConfig.array('images', 4), (req, res) => {

    // If one of the parameters is empty, send a bad-request response
    if (!req.body.title) {
        return res.status(400).json({
            "message": "Request requires a title."
        });
    } else if (!req.body.description) {
        return res.status(400).json({
            "message": "Request requires a description."
        });
    } else if (!req.body.category) {
        return res.status(400).json({
            "message": "Request requires a category."
        });
    } else if (!req.body.locationCountry) {
        return res.status(400).json({
            "message": "Request requires a country."
        });
    } else if (!req.body.locationCity) {
        return res.status(400).json({
            "message": "Request requires a city."
        });
    } else if (!req.body.askingPrice) {
        return res.status(400).json({
            "message": "Request requires a price."
        });
    } else if (!req.body.deliveryType) {
        return res.status(400).json({
            "message": "Request requires a delivery type."
        });
    } else if (req.body.deliveryType !== "pickup" && req.body.deliveryType !== "delivery") {
        return res.status(400).json({
            "message": "Delivery type need to be either pickup or delivery"
        });
    } else if (!req.body.sellerName) {
        return res.status(400).json({
            "message": "Request requires a seller name."
        });
    } else if (!req.body.sellerEmail) {
        return res.status(400).json({
            "message": "Request requires contact information."
        });
    }

    // call function to add item to database 
    itemsDatabase.addItem(req.user.userId, req.body.title, req.body.description, req.body.category, req.body.locationCountry, req.body.locationCity, req.files, req.body.askingPrice, req.body.deliveryType, req.body.sellerName, req.body.sellerEmail);

    return res.status(201).json({
        "message": "Item successfully created."
    })

})


/*
PUT /items/:itemId
Edit an existing item
 */

app.put('/items/:itemId', passport.authenticate('jwt', {
    session: false
}), uploadConfig.array('images', 4), (req, res) => {

    let oldItemBody = itemsDatabase.getItemByItemId(req.params.itemId);

    if (!oldItemBody) {
        return res.status(404).json({
            "message": "Item does not exist."
        });
    }
    //check if user is authorized to edit the item
    if (oldItemBody.userId !== req.user.userId) {
        return res.status(401).json({
            "message": "You are not authorized to modify this item."
        });
    }

    // If one of the parameters is empty, send a bad-request response
    if (!req.body.title) {
        return res.status(400).json({
            "message": "Request requires a title."
        });
    } else if (!req.body.description) {
        return res.status(400).json({
            "message": "Request requires a description."
        });
    } else if (!req.body.category) {
        return res.status(400).json({
            "message": "Request requires a category."
        });
    } else if (!req.body.locationCountry) {
        return res.status(400).json({
            "message": "Request requires a country."
        });
    } else if (!req.body.locationCity) {
        return res.status(400).json({
            "message": "Request requires a city."
        });
    } else if (!req.body.askingPrice) {
        return res.status(400).json({
            "message": "Request requires a price."
        });
    } else if (!req.body.deliveryType) {
        return res.status(400).json({
            "message": "Request requires a delivery type."
        });
    } else if (!req.body.sellerName) {
        return res.status(400).json({
            "message": "Request requires a seller name."
        });
    } else if (!req.body.sellerEmail) {
        return res.status(400).json({
            "message": "Request requires contact information."
        });
    }

    // Saving the new images by replacing the old ones.
    let copyItemBody = req.body;
    if (req.files) {
        if (oldItemBody.images) {
            oldItemBody.images.splice(0, oldItemBody.images.length);
        }

        copyItemBody.images = req.files;
    }

    oldItemBody = itemsDatabase.editItem(oldItemBody, copyItemBody);

    return res.status(200).json(oldItemBody);
})


/*
DELETE /items/:itemId
Delete an existing item.
 */

app.delete('/items/:itemId', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const copyItemBody = itemsDatabase.getItemByItemId(req.params.itemId);

    // Check if an item with the given id exists.
    if (copyItemBody === false) {
        return res.status(404).json({
            "message": "Item does not exits."
        });
    }

    //check if user is authorized to delete the item
    if (copyItemBody.userId != req.user.userId) {
        return res.status(401).json({
            "message": "You are not authorized to delete this item."
        });
    }

    // call function to remove the item from the database
    itemsDatabase.deleteItem(copyItemBody);

    return res.status(200).json({
        "message": "Item successfully deleted."
    });

});


/*
GET /items/search/:searchOption/:searchValue
Search in all items by category, location or date
 */

app.get('/items/search/:searchOption/:searchValue', (req, res) => {

    let resultItems = [];

    // Run different functions for different search options
    if (req.params.searchOption === "locationCountry") {

        // call function to get all requested items from the database
        resultItems = itemsDatabase.getItemsByCountry(req.params.searchValue);

        if (Object.keys(resultItems).length > 0) {

            return res.status(200).json(resultItems);

        } else {
            return res.status(400).json({
                "message": "There are no items with this search specification."
            });
        }

    } else if (req.params.searchOption === "locationCity") {

        // call function to get all requested items from the database
        resultItems = itemsDatabase.getItemsByCity(req.params.searchValue);

        if (Object.keys(resultItems).length > 0) {

            return res.status(200).json(resultItems);

        } else {
            return res.status(400).json({
                "message": "There are no items with this search specification."
            });
        }


    } else if (req.params.searchOption === "date") {

        // Input format -> DDMMYYYY e.g. 17061997
        let date = String(req.params.searchValue);


        if (date.length === 8) {
            date = date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4, 8);
        } else {
            return res.status(400).json({
                "message": "Invalid date format. Date format must be DDMMYYYY e.g. 17061997"
            });
        }

        // call function to get all requested items from the database
        resultItems = itemsDatabase.getItemsByDate(date);

        if (Object.keys(resultItems).length > 0) {

            return res.status(200).json(resultItems);

        } else {
            return res.status(400).json({
                "message": "There are no items with this search specification."
            });
        }


    } else if (req.params.searchOption === "category") {

        // call function to get all requested items from the database
        resultItems = itemsDatabase.getItemsByCategory(req.params.searchValue);

        if (Object.keys(resultItems).length > 0) {

            return res.status(200).json(resultItems);

        } else {
            return res.status(400).json({
                "message": "There are no items with this search specification."
            });
        }

    } else {
        return res.status(404).json({
            "message": "Invalid search option. Choose between the following: category, date, locationCountry, locationCity"
        });
    }

});

// Route for everything else than the previous routes.
app.use('*', (req, res) => {

    return res.status(404).json({
        "message": "Path does not exist."
    });

});

app.use('*', errorHandler.clientError);


let apiInstance = null;

exports.start = () => {
    apiInstance = app.listen(PORT, HOST)
    console.log(`Example app listening at http://${HOST}:${PORT}`)
}

exports.stop = () => {
    apiInstance.close();
}