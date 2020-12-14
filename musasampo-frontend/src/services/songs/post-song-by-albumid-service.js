//http://localhost:9000/songs/:albumId/createsong

//get songs from backend by albumId
export default async function postSongByalbumId(albumId,obj)
{
    //fetch the album with this id
    //building the header
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    //Parameter for get method
    const requestOptions = 
    {
        method: 'POST',
        headers: myHeaders ,
        body: JSON.stringify(obj)
    }

    //creating the fetch url
    const url = new URL('http://localhost:9000/songs/createsong/'+albumId);

    //calling the API get method
    var songResponse = await fetch(url, requestOptions);

    return songResponse;
};