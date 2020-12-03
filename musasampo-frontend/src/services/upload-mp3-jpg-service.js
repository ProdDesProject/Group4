//upload Data to server
import { stringify } from 'querystring';

export default async function uploadData(FormData,bandName,albumName)
{
    const requestOptions2 = 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: FormData
    }
  
    const response =  await fetch('http://localhost:9000/upload/mp3byfile/'+bandName+'/'+ albumName,requestOptions2)
    const data2 = await response;
};
