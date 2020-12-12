//fetch bands from backend
export default async function createBand(bandName, country, bandLogo, nsfw)
{
    //get the userId from the local storage
    var user = localStorage.getItem('currentUser');
    //get the token from the local storage
    var token = localStorage.getItem('currentToken');
    //check if user is in local storage
    if(user !== undefined)
    {
        //parsing the found JSON
        const foundUser = JSON.parse(user);
        //getting the userID
        //console.log(foundUser);
        const userId = foundUser.results[0].userId;
        
        //parsing the found token JSON
        const foundToken = JSON.parse(token);
        
        //building the body to be sent
        var bodyObject = 
        {
            userId: userId,
            bandName: bandName,
            country: country,
            bandLogo: bandLogo,
            nsfw: nsfw
        };

        //building the header
        var myHeaders = new Headers();
        myHeaders.append("Authorization",  "Bearer " + foundToken.token.token, 'Content-Type', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        //request options for the fetch
        const requestOptions = 
        {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(bodyObject)
          }

        console.log(bodyObject);

        //creating the fetch url
        const url = new URL('http://localhost:9000/bands/createband/' + userId);

        //calling the API delete method
        var createBandResponse = await fetch(url, requestOptions);

        //return status
        return createBandResponse.status;
    }
    return ;
};
