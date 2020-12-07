import { stringify } from 'querystring';

/** 
 * Check uploading data for Image or Mp3. Needs to be check before uploading!:
*/

export default async function checkUploadData(username,password)
{   
    //req.body for fetch:
    const requestOptions1 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username ,password: password })
    };

    //Fetch which checks Data which is uploading:
    var checkData= await fetch('http://localhost:9000/users/checkuser/', requestOptions1);
    const result = await checkData.json();
    //alert(checkData)
    //var result2 = result.user[0];
    return result;

}
