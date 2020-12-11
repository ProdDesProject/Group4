//Check uploading data
import { stringify } from 'querystring';
//bandName,bandLogo,albumName,albumPicture,songName,MP3
export default async function checkUploadData(data2)
{   
    //req.body for fetch:
    const requestOptions1 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data2 })
    };

    //Fetch which checks Data which is uploading:
    var checkData= await fetch('http://localhost:9000/upload/checkData', requestOptions1)
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
