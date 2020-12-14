//get songs from backend by albumId
export default async function getSongsByalbumId(albumId)
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
    const url = new URL('http://localhost:9000/search/songs/albumId/' + albumId);

    //calling the API get method
    var songResponse = await fetch(url, requestOptions);

    return songResponse;
};