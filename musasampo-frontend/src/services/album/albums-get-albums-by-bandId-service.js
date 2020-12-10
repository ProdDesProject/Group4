export default async function fetchAlbumsBybandId(bandId)
{
    //fetch for checkuser2 and get a response
    const albumsResponse = await fetch('http://localhost:9000/albums/bandId/' + bandId);
    //get the status response
    const data = await albumsResponse.json();

    //alert(data);

    if (data === 404 || data === 400 || data === 500)
    {
       alert("Error");
    }
    else
    {
        return data;  
    }
};