export async function getBandPicture(band,picture)
{
    //fetch for band picture and get a response
    const response = await fetch('http://localhost:9000/upload/imagepath.png/'+ band +'/'+ picture +'.png')
    //get the status response
    const data = response;

    //alert(data);

    if (data === 404 || data === 400 || data === 500)
    {
       alert("Error");
    }
    else
    {
        return data;  
    }
}