//upload Data to server:

//need file data and bandName,albumName for routing to right folder in server:
export default async function uploadData(FormData,bandName,albumName,fileInfo)
{
    //alert("upload:"+bandName,albumName);
    async function UploadMp3(FormData,bandName,albumName)
    {
        const requestOptions2 = 
        {
            method: 'POST',
            body: FormData
        }   
        let url = 'http://localhost:9000/upload/uploadmp3/'+bandName+'/'+ albumName;
        const response =  await fetch(url,requestOptions2);
        return response;
    }

    async function UploadBandPic(FormData,bandName)
    {
        const requestOptions2 = 
        {
            method: 'POST',
            body: FormData
        }
    
        var url = 'http://localhost:9000/upload/uploadbandpic/'+bandName;
        const response =  await fetch(url,requestOptions2);

        return response;
    }

    async function UploadAlbumPic(FormData,bandName,albumName)
    {
        const requestOptions2 = 
        {
            method: 'POST',
            body: FormData
        }
    
        var url = 'http://localhost:9000/upload/addAlbumPicture/'+bandName+'/'+albumName;
        const response =  await fetch(url,requestOptions2);

        return response;
    }
   
    /**
     * STARTS HERE:
     */

    if (fileInfo === "mp3-upload")
    {
        //alert("mp3")
        var result = await UploadMp3(FormData,bandName,albumName);
        return result;
    }
    else if (fileInfo === "png-band")
    {
        //alert("png")
        var result = await UploadBandPic(FormData,bandName);
        return result;
    }
    else if (fileInfo === "png-album")
    {
        //alert("png")
        var result = await UploadAlbumPic(FormData,bandName,albumName);
        return result;
    };

};
