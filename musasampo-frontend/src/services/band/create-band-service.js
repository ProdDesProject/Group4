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
        const userId = foundUser.userId;
        
        //parsing the found token JSON
        const foundToken = JSON.parse(token);

        //spaces to %20
        let bandName2 = encodeURIComponent(bandName.trim());
        let bandLogo2 = encodeURIComponent(bandLogo.trim());
        
        //building the body to be sent
        var bodyObject = 
        {
            userId: userId,
            bandName: bandName2,
            country: country,
            bandLogo: bandLogo2,
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

        //creating the fetch url
        const url = new URL('http://localhost:9000/bands/createband/' + userId);

        //calling the API delete method
        var createBandResponse = await fetch(url, requestOptions);

        //return status
        return createBandResponse.status;
    }
    return ;
};
