import { stringify } from 'querystring';

/** 
 * Check uploading data for Image or Mp3. Needs to be check before uploading!:
*/

export default async function getUserId(username)
{   

    //Fetch which checks Data which is uploading:
    var checkData= await fetch('http://localhost:9000/users/getIdByUsername/'+ username);
    const result = await checkData.json();
    //alert(checkData)
    //var result2 = result.user[0];
    return result;

}
