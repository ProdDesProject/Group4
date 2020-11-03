const {
    v4: uuidv4
} = require('uuid');

let song = [{
    bandId: "2",
    albumId: "1",
    songId: "1",
    songName: "Shrapnel Sodomy",
    MP3: "ASD",
    MP4: "ASD"
}];

module.exports = {
    addSong: (bandId, albumId, songName, MP3, MP4) => {
        song.push({
            id: uuidv4(),
            bandId,
            albumId,
            songName,
            MP3,
            MP4
        });
    },

    getSongBySongId(songId) {
        for (let i = 0; i < song.length; i++) {
            if (song[i].songId === songId) {
                return song[i];
            }
        }

        return false;
    },

    getSongByName(songsName) {

        const resultSongs = [];

        for (let i = 0; i < song.length; i++) {
            if (song[i].songName === songsName) {
                resultSongs.push(song[i]);
            }
        }

        return resultSongs;

    }
}