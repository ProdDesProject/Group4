//Check uploading data
import { stringify } from 'querystring';

/**
 * createFolder-function takes needed information to back-end and creates a new folders for uploading images and music
 **/

export default async function createFolders(bandName,albumName)
{   
    async function createBand(bandName)
    {
        //request info for creating a band:
        const requestForBand = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bandName: bandName})
        };

        //Fetch which checks Data which is uploading:
    var checkData= await fetch('http://localhost:9000/upload/createFoldersForUpload', requestForBand)
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

    async function createAlbum(bandName2,albumName2)
    {
        //alert("createAlbum:"+bandName2+albumName2);
        //request info for creating a album:
        const createFolders = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bandName: bandName2,albumName: albumName2})
            
        };

         //create Folders:
        var checkData= await fetch('http://localhost:9000/upload/createFoldersForUpload', createFolders);
        const result = await checkData.json();

        //alert("result2:"+result);

        return result;
         //result check:
    };

    var result;

    if (bandName !== undefined && albumName === undefined)
    {
        result =  await createBand(bandName);
    }
    if (bandName !== undefined && albumName !== undefined)
    {
        result = await createAlbum(bandName,albumName);
    }
    return result;


}
