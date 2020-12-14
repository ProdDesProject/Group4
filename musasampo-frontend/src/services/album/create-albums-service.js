//fetch bands from backend
export default async function createAlbum(bandId, albumName, albumLaunchDate, albumPicture, albumGenre)
{
  //get the token from the local storage
  var token = localStorage.getItem('currentToken');
  //check if token is in local storage
  if(token !== undefined)
  {
      //parsing the found token JSON
      const foundToken = JSON.parse(token);

      //building the body to be sent
      var bodyObject = 
      {
          bandId: bandId,
          albumName: encodeURIComponent(albumName.trim()), 
          albumLaunchDate: albumLaunchDate,
          albumPicture: encodeURIComponent(albumPicture.trim()), 
          albumGenre: encodeURIComponent(albumGenre.trim())
      };

      //building the header
      var myHeaders = new Headers();
      myHeaders.append("Authorization",  "Bearer " + foundToken.token.token, 'Content-Type', 'application/json');
      myHeaders.append('Content-Type', 'application/json');

      //request options for the POST fetch
      const requestOptionsPost = 
      {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(bodyObject)
      }
      
        //creating the fetch url
        const createAlbumURL = new URL('http://localhost:9000/albums/' + bandId + '/createalbum');

        //calling the API delete method
        var createAlbumResponse = await fetch(createAlbumURL, requestOptionsPost);

        console.log(createAlbumResponse);

        //return status
        return createAlbumResponse.status;
  }
  return null;
}