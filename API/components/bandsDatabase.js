const {
    v4: uuidv4
} = require('uuid');
const albumsDatabase = require('./components/albumsDatabase.js');
const songsDatabase = require('./components/songsDatabase.js');



let bands = [{
        bandId: '2',
        nsfw: true,
        bandName: "ANAL GRENADE",
        country: "Canada",
        bandLogo: "GUHUROGFNHEGMKEHRGRNMDFNÖOJKRNÖLK",
    },
    {
        bandId: '3',
        nsfw: false,
        bandName: "Sleepless nights",
        country: "Sweden",
        bandLogo: "Sleepless Nights",
    }
];




module.exports = {
    // Function to add a new item to the database
    addBand(bandId, nsfw, country, bandLogo) {
        return bands.push({
            id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
            bandId,
            nsfw,
            bandName,
            country,
            bandLogo
        });
    },
    // Function to get an items by id
    getBandByBandId(bandId) {
        for (let i = 0; i < bands.length; i++) {
            if (bands[i].bandId === bandId) {
                return bands[i];
            }
        }

        return false;
    },

    // Function to edit an item
    editBand(oldBand, newBand) {

        for (let i = 0; i < bands.length; i++) {
            if (bands[i].bandId === oldBand.bandId) {
                bands[i].nsfw = newBand.nsfw;
                bands[i].bandName = newBand.bandName;
                bands[i].country = newBand.country;
                return bands[i];
            }
        }
        return false;

    },

    // Function to get all items of the same category
    getBandByName(bandsName) {

        const resultBands = [];

        for (let i = 0; i < bands.length; i++) {
            if (bands[i].bandName === bandsName) {
                resultBands.push(bands[i]);
            }
        }

        return resultBands;

    },

    // Function to get all Items of the same country
    getBandsByCountry(countryName) {

        const resultBands = [];

        for (let i = 0; i < bands.length; i++) {
            if (bands[i].country === countryName) {
                resultBands.push(bands[i]);
            }
        }

        return resultBands;
    },


    // Function to get all items from the same city
    /*getItemsByCity(cityName) {

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
    },*/
    deleteBand(band) {
        for (let i = 0; i < bands.length; i++) {
            if (bands[i].bandId === band.bandId) {
                bands.splice(i, 1);
            }
        }
    }

}