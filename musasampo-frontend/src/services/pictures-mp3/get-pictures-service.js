//upload Data to server
import { stringify } from 'querystring';

//need file data and bandName,albumName for routing to right folder in server:
export default async function getPictures(bandName,imageLogo)
{ 
    //alert("bandName:"+bandName);
    //alert("imageLogo:"+imageLogo);

    var url = 'http://localhost:9000/upload/imagepath.png/'+bandName+'/'+ imageLogo;
    
    //alert("url:"+url);
    ///imagepath.png/:band/:image
    //const response =  await fetch(url);
    //const data = await response;
    //alert(response);
    //const data2 = await response;
    return url;
};
