//fetch albums from backend
export default async function fetchAlbumsByalbumId(albumId)
{
    //fetch the album with this id
    //building the header
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    //Parameter for get method
    const requestOptions = 
    {
        method: 'GET',
        headers: myHeaders ,
    }

    //creating the fetch url
    const url = new URL('http://localhost:9000/search/albums/albumId/' + albumId);

    //calling the API get method
    var albumResponse = await fetch(url, requestOptions);

    return albumResponse;
};