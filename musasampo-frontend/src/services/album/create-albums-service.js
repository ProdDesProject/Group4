//fetch bands from backend
export default async function createAlbum(bandName, albumName, albumLaunchDate, albumPicture, albumGenre)
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
          bandName: bandName,
          albumName: albumName, 
          albumLaunchDate: albumLaunchDate,
          albumPicture: albumPicture, 
          albumGenre: albumGenre
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

      //request options for the GET fetch
      const requestOptionsGet = 
      {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
      }
      
      //get the bandId by bandName with the search
      //creating the fetch url
      const searchURL = new URL('http://localhost:9000/search/bands/bandName/' + bandName);

      //calling the API get method
      var searchBandResponse = await fetch(searchURL, requestOptionsGet);

      if(searchBandResponse.status === 200)
      {
        const band = await searchBandResponse.json();

        const bandId = band[0].bandId;

        //creating the fetch url
        const createAlbumURL = new URL('http://localhost:9000/albums/' + bandId + '/createalbum');

        //calling the API delete method
        var createAlbumResponse = await fetch(createAlbumURL, requestOptionsPost);

        console.log(createAlbumResponse);

        //return status
        return createAlbumResponse.status;
      }

      
  }
  return ;

    var object = 
  {
    "albumName": albumName, 
    "albumLaunchDate": albumLaunchDate,
    "albumPicture": albumPicture, 
    "albumGenre": albumGenre
  };

  //Parameter for postmethod
  const requestOptions = 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object)
  }

   //fetch for creating a new album and it sends response back if succeeded or not
  const response =  await fetch('http://localhost:9000/albums/:bandId/createalbum',requestOptions)
  const data2 = response.status;

  //alert(data2);

  var obj = 
  {
    result: false
  };

  if(data2 === 201)
  {
     obj.result = true;
  }

  //returns if all goes well to sign-up.component.jsx
  return obj;
}
