import { stringify } from 'querystring';

/** 
 * Check uploading data for Image or Mp3. Needs to be check before uploading!:
*/

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

    //alert("result"+result);
    
    //result check:
    if (result == "200")
    {
        return "200";
    }
    else
    {
        return "400";
    }

}
