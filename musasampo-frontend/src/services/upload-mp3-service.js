//upload Data to server
import { stringify } from 'querystring';

//need file data and bandName,albumName for routing to right folder in server:
export default async function uploadData(FormData,bandName,albumName)
{
    //alert("upload:"+bandName,albumName);

    const requestOptions2 = 
    {
        method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        body: FormData
    }
    let url = 'http://localhost:9000/upload/mp3byfile/'+bandName+'/'+ albumName;
    alert(url);

    const response =  await fetch(url,requestOptions2);
    const data2 = await response.json();

    return data2;
};
