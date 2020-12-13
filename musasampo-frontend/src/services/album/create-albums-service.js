//fetch bands from backend
export async function createAlbum(albumName, albumLaunchDate, albumPicture, albumGenre)
{
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
