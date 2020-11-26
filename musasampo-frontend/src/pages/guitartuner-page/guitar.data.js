//import self recorded notes that I put into the notes-folder
import note1 from '../notes/A.mp3'; //Is actually A#, # is not allowed in the filename
import note2 from '../notes/F.mp3';

//Tuners in order, named with titles. Strings go from thinnest to the thickest from up to down.
const GUITAR_DATA = [
    {
        guitarId: 0,
        title: 'Standard Tune',
        imageUrl: 'https://static.thenounproject.com/png/154990-200.png',
        routeName: 'acoustic',
        strings: [{
            id: 0,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e4.mp3',
        },
        {
            id: 1,
            title: 'B',
            soundUrl: 'https://tuner-online.com/audio/b3.mp3',
        },
        {
            id: 2,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g3.mp3',
        },
        {
            id: 3,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d3.mp3',
            
        },
        {
            id: 4,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a2.mp3',
            
        },
        {
            id: 5,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e2.mp3',
        }]
    },
    {
        guitarId: 5,
        title: 'Drop D',
        imageUrl: 'https://static.thenounproject.com/png/154990-200.png',
        routeName: 'acousticuff',
        strings: [{
            id: 0,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e4.mp3',
        },
        {
            id: 1,
            title: 'B',
            soundUrl: 'https://tuner-online.com/audio/b3.mp3',
        },
        {
            id: 2,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g3.mp3',
        },
        {
            id: 3,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d3.mp3',
            
        },
        {
            id: 4,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a2.mp3',
            
        },
        {
            id: 5,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d2.mp3',
        }]
    },
    {
        guitarId: 1,
        title: 'Drop C',
        imageUrl: 'https://static.thenounproject.com/png/154990-200.png',
        routeName: 'electric',
        strings: [{
            id: 0,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d4.mp3',
        },
        {
            id: 1,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a3.mp3',
        },
        {
            id: 2,
            title: 'F',
            soundUrl: 'https://tuner-online.com/audio/f3.mp3',
        },
        {
            id: 3,
            title: 'C',
            soundUrl: 'https://tuner-online.com/audio/c3.mp3',
            
        },
        {
            id: 4,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g2.mp3',
            
        },
        {
            id: 5,
            title: 'C',
            soundUrl: 'https://tuner-online.com/audio/c2.mp3',
        }]
    },
    {
        guitarId: 6,
        title: 'D-standard',
        imageUrl: 'https://static.thenounproject.com/png/154990-200.png',
        routeName: 'electric',
        strings: [{
            id: 0,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d4.mp3',
        },
        {
            id: 1,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a3.mp3',
        },
        {
            id: 2,
            title: 'F',
            soundUrl: 'https://tuner-online.com/audio/f3.mp3',
        },
        {
            id: 3,
            title: 'C',
            soundUrl: 'https://tuner-online.com/audio/c3.mp3',
            
        },
        {
            id: 4,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g2.mp3',
            
        },
        {
            id: 5,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d2.mp3',
        }]
    },
    {
        guitarId: 7,
        title: 'C-standard',
        imageUrl: 'https://static.thenounproject.com/png/154990-200.png',
        routeName: 'electric',
        strings: [{
            id: 0,
            title: 'C',
            soundUrl: 'https://tuner-online.com/audio/c4.mp3',
        },
        {
            id: 1,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g3.mp3',
        },
        {
            id: 2,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d3.mp3',
        },
        {
            id: 3,
            title: 'A#',
            soundUrl: note1,
        },
        {
            id: 4,
            title: 'F',
            soundUrl: note2,
        },
        {
            id: 5,
            title: 'C',
            soundUrl: 'https://tuner-online.com/audio/c2.mp3',
        }]
    },
    //7-stringed still have images of a 6-stringed, could be changed but not necessary
    {
        guitarId: 8,
        title: '7-String standard',
        imageUrl: 'https://static.thenounproject.com/png/154990-200.png',
        routeName: 'electric',
        strings: [{
            id: 0,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e4.mp3',
        },
        {
            id: 1,
            title: 'B',
            soundUrl: 'https://tuner-online.com/audio/b3.mp3',
        },
        {
            id: 2,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g3.mp3',
        },
        {
            id: 3,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d3.mp3',
            
        },
        {
            id: 4,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a2.mp3',
            
        },
        {
            id: 5,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e2.mp3',
        },
        {
            id: 6,
            title: 'B',
            soundUrl: 'https://tuner-online.com/audio/b1.mp3'
        }]
    },
    {
        guitarId: 9,
        title: '7-String drop A',
        imageUrl: 'https://static.thenounproject.com/png/154990-200.png',
        routeName: 'electric',
        strings: [{
            id: 0,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e4.mp3',
        },
        {
            id: 1,
            title: 'B',
            soundUrl: 'https://tuner-online.com/audio/b3.mp3',
        },
        {
            id: 2,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g3.mp3',
        },
        {
            id: 3,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d3.mp3',
            
        },
        {
            id: 4,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a2.mp3',
            
        },
        {
            id: 5,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e2.mp3',
        },
        {
            id: 6,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a1.mp3'
        }]
    },
    {
        guitarId: 2,
        title: 'Bass Guitar Tuner',
        imageUrl: 'https://static.thenounproject.com/png/154989-200.png',
        routeName: 'bass',
        strings: [{
            id: 0,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/g2.mp3',
        },
        {
            id: 1,
            title: 'D',
            soundUrl: 'https://tuner-online.com/audio/d2.mp3',
        },
        {
            id: 2,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/a1.mp3',
        },
        {
            id: 3,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/e1.mp3',
        }]
    },
    //ukulele image is not a silhouette yet - couldn't find one from the internet. Could provide a copyright issue but maybe not necessary to edit.
    {
        guitarId: 3,
        title: 'Ukulele Tuner',
        imageUrl: 'https://stuff.fendergarage.com/images/4/w/v/online-tuner-web-ukulele-headstock@2x.png',
        routeName: 'ukulele',
        strings: [{
            id: 0,
            title: 'A',
            soundUrl: 'https://tuner-online.com/audio/ukulele/a4.mp3',
        },
        {
            id: 1,
            title: 'E',
            soundUrl: 'https://tuner-online.com/audio/ukulele/e4.mp3',
        },
        {
            id: 2,
            title: 'C',
            soundUrl: 'https://tuner-online.com/audio/ukulele/c4.mp3',
        },
        {
            id: 3,
            title: 'G',
            soundUrl: 'https://tuner-online.com/audio/ukulele/g4.mp3',
        }]
    },
];

export default GUITAR_DATA;
