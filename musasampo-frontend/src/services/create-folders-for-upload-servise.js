//Check uploading data
import { stringify } from 'querystring';

/**
 * createFolder-function takes needed information to back-end and creates a new folders for uploading images and music
 **/

export default async function createFolders(bandName,albumName)
{   
    async function createBand()
    {
        //request info for creating a band:
        const requestForBand = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bandName: bandName})
        };

        //Fetch which checks Data which is uploading:
    var checkData= await fetch('http://localhost:9000/upload/createFolders', requestForBand)
    const result = await checkData.json();

     //result check:
     if (result == "200")
     {
         return "200";
     }else
     {
         return "400";
     }
    }

    async function createAlbum()
    {
        //request info for creating a album:
        const requestForAlbum = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bandName: bandName,albumName: albumName})
            
        };

         //Fetch which checks Data which is uploading:
        var checkData= await fetch('http://localhost:9000/upload/createFolders', requestForAlbum)
        const result = await checkData.json();

         //result check:
        if (result == "200")
        {
            return "200";
        }else
        {
            return "400";
        }
    };

    if (bandName != undefined && albumName == undefined)
    {
        createBand(bandName);
    }
    if (bandName != undefined && albumName != undefined)
    {
        createAlbum(bandName,albumName);
    }

}
