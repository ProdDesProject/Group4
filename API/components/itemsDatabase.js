const {
    v4: uuidv4
} = require('uuid');
const moment = require('moment');

let items = [{
        itemId: '2',
        dateOfPosting: "17/06/2020",
        userId: "1",
        title: "Test item",
        description: "This is an example item",
        category: "animals",
        locationCountry: "Sweden",
        locationCity: "Stockholm",
        askingPrice: 77.77,
        deliveryType: "shipping",
        sellerName: "Jonas",
        sellerEmail: "jonas@gmail.com"
    },
    {
        itemId: '3',
        dateOfPosting: "17/06/2020",
        userId: "1",
        title: "Testitem 1",
        description: "This is an example item",
        category: "electronic",
        locationCountry: "Finland",
        locationCity: "Oulu",
        askingPrice: 77.77,
        deliveryType: "pickup",
        sellerName: "Jonas",
        sellerEmail: "jonas@gmail.com"
    }
];


module.exports = {
    // Function to add a new item to the database
    addItem(userId, title, description, category, locationCountry, locationCity, images, askingPrice, deliveryType, sellerName, sellerEmail) {
        return items.push({
            id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
            dateOfPosting: moment().format('L'),
            userId,
            title,
            description,
            category,
            locationCountry,
            locationCity,
            images,
            askingPrice,
            deliveryType,
            sellerName,
            sellerEmail
        });
    },
    // Function to get an items by id
    getItemByItemId(itemId) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].itemId === itemId) {
                return items[i];
            }
        }

        return false;
    },

    // Function to edit an item
    editItem(oldItem, newItem) {

        for (let i = 0; i < items.length; i++) {
            if (items[i].itemId === oldItem.itemId) {
                items[i].dateOfPosting = moment().format('L');
                items[i].title = newItem.title;
                items[i].description = newItem.description;
                items[i].category = newItem.category;
                items[i].locationCountry = newItem.locationCountry;
                items[i].locationCity = newItem.locationCity;
                items[i].images = newItem.images;
                items[i].askingPrice = newItem.askingPrice;
                items[i].deliveryType = newItem.deliveryType;
                items[i].sellerName = newItem.sellerName;
                items[i].sellerEmail = newItem.sellerEmail;

                return items[i];
            }
        }
        return false;

    },

    // Function to get all items of the same category
    getItemsByCategory(categoryName) {

        const resultItems = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].category === categoryName) {
                resultItems.push(items[i]);
            }
        }

        return resultItems;

    },

    // Function to get all Items of the same country
    getItemsByCountry(countryName) {

        const resultItems = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].locationCountry === countryName) {
                resultItems.push(items[i]);
            }
        }

        return resultItems;
    },


    // Function to get all items from the same city
    getItemsByCity(cityName) {

        const resultItems = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].locationCity === cityName) {
                resultItems.push(items[i]);
            }
        }

        return resultItems;
    },

    // Function to get all items created/edited on a specific date
    getItemsByDate(date) {

        const resultItems = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].dateOfPosting == date) {
                resultItems.push(items[i]);
            }
        }

        return resultItems;
    },
    deleteItem(item) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].itemId === item.itemId) {
                items.splice(i, 1);
            }
        }
    }

}