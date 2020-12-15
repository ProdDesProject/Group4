
export default async function EditUser(username, email, name, phoneNumber)
{
    //create body object
    var bodyObject = 
    {
        "username": username, 
        "email": email, 
        "name": name, 
        "phoneNumber": phoneNumber,
    };
    //console.log(bodyObject);
    //get the userId from the local storage
    var user = localStorage.getItem('currentUser');
    //get the token from the local storage
    var token = localStorage.getItem('currentToken');
    //check if user is in local storage
    if(user !== undefined)
    {
        //parsing the found JSON
        const foundUser = JSON.parse(user);
        //getting the userId
        const userId = foundUser.userId;
        //parsing the found token JSON
        const foundToken = JSON.parse(token);
        
        //building the header
        var myHeaders = new Headers();
        myHeaders.append("Authorization",  "Bearer " + foundToken.token.token, 'Content-Type', 'application/json');
        myHeaders.append('Content-Type', 'application/json');
        //console.log(myHeaders);
        //Parameter for put method
        const requestOptions = 
        {
            method: 'PUT',
            headers: myHeaders ,
            body: JSON.stringify(bodyObject)
        }

        //console.log(requestOptions.body);

        //creating the fetch url
        const url = new URL('http://localhost:9000/users/modify/' + userId);

        //calling the API put method
        var editResponse = await fetch(url, requestOptions);

        //return status
        return editResponse;
    }
    return;
}