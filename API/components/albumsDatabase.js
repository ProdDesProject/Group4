const {
    v4: uuidv4
} = require('uuid');
const moment = require('moment');
const songsDatabase = require('./components/songsDatabase.js');


let albums = [{
    bandId: "2",
    albumId: "1",
    albumName: "Test album",
    albumLaunchDate: "2020-11-03",
    albumsPicture: "",
    albumGenre: "Goregrind",
    /*songs: [
        {
            songsDatabase.addSong;
        }
    ]*/
}];

module.exports = {
    addAlbum(bandId, albumName, albumPicture, albumGenre) {
        return albums.push({
            id: uuidv4(),
            bandId,
            albumName,
            albumLaunchDate: moment.format('L'),
            albumPicture,
            albumGenre
        });
    },

    getAlbumByAlbumId(albumId) {
        for (let i = 0; i < albums.length; i++) {
            if (albums[i].albumId === albumId) {
                return albums[i];
            }
        }

        return false;
    },

    getAlbumByName(albumsName) {

        const resultAlbums = [];

        for (let i = 0; i < albums.length; i++) {
            if (albums[i].albumName === albumsName) {
                resultAlbums.push(albums[i]);
            }
        }

        return resultAlbums;

    },

    getAlbumsByGenre(genreName) {

        const resultAlbums = [];

        for (let i = 0; i < albums.length; i++) {
            if (albums[i].albumGenre === genreName) {
                resultAlbums.push(albums[i]);
            }
        }

        return resultAlbums;
    },

    deleteAlbum(album) {
        for (let i = 0; i < albums.length; i++) {
            if (albums[i].albumId === album.albumId) {
                albums.splice(i, 1);
            }
        }
    }
}